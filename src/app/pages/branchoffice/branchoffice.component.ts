import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { Customer } from "src/app/demo/domain/customer";
import { CustomerService } from "src/app/demo/service/customerservice";
import { BranchOfficeService } from "src/app/services/branch-office.service";

@Component({
  selector: "app-branchoffice",
  templateUrl: "./branchoffice.component.html",
  styles: [
    `
      :host ::ng-deep .p-message {
        margin-left: 0.25em;
      }

      :host ::ng-deep .p-toast {
        z-index: 99999;
      }
    `,
  ],
  providers: [MessageService],
})
export class BranchofficeComponent implements OnInit {
  customers1: Customer[];

  navigation: string = "";

  private busy: boolean = true;

  formBranchOffice: FormGroup;

  constructor(
    private fb: FormBuilder,
    private branchOfficeService: BranchOfficeService,
    private service: MessageService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.formBranchOffice = this.fb.group({
      corporateName: [
        "",
        Validators.compose([
          Validators.required,
          Validators.min(5),
          Validators.max(250),
        ]),
      ],
      branchOfficeName: [
        "",
        Validators.compose([
          Validators.required,
          Validators.min(5),
          Validators.max(250),
        ]),
      ],
      codeOffice: ["", Validators.required],
      stateRegistration: ["", Validators.max(250)],
      cpfCnpj: [
        "",
        Validators.compose([
          Validators.required,
          Validators.min(5),
          Validators.max(250),
        ]),
      ],
      email: [
        "",
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.min(5),
          Validators.max(250),
        ]),
      ],
    });

    this.customerService.getCustomersLarge().then((customers) => {
      this.customers1 = customers;
    });
  }

  save() {
    this.busy = true;
    this.branchOfficeService.save(this.formBranchOffice.value).subscribe({
      next: () => {
        this.showSuccessViaToast(),
          this.formBranchOffice.reset(),
          (this.busy = false);
      },
      error: () => {
        this.showErrorViaToast(), (this.busy = false);
      },
    });
  }

  showErrorViaToast() {
    this.service.add({
      key: "tst",
      severity: "error",
      summary: "Mensagem de Erro",
      detail: "Ocorreu algum erro!",
    });
  }

  showSuccessViaToast() {
    this.service.add({
      key: "tst",
      severity: "success",
      summary: "Mensagem de Sucesso",
      detail: "Salvo com sucesso!",
    });
  }
}
