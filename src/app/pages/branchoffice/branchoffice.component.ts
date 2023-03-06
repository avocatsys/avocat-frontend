import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { BranchOffice } from "src/app/models/branch-office.models";
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
  rows: BranchOffice[];

  navigation: string = "";

  busy: boolean = false;

  formBranchOffice: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: MessageService,
    private branchOfficeService: BranchOfficeService
  ) {}

  ngOnInit(): void {
    this.load();

    this.formBranchOffice = this.fb.group({
      id: [null],
      corporateName: [
        "",
        Validators.compose([
          Validators.required,
          Validators.max(200),
        ]),
      ],
      branchOfficeName: [
        "",
        Validators.compose([
          Validators.required,
          Validators.max(200),
        ]),
      ],
      codeOffice: [""],
      stateRegistration: [null, Validators.max(250)],
      cpfCnpj: [
        "",
        Validators.compose([
          Validators.required,
          Validators.max(200),
        ]),
      ],
      email: [
        "",
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.max(200),
        ]),
      ],
    });
  }

  save() {
    this.busy = true;
    this.formBranchOffice.disable();
    if (
      this.formBranchOffice.value.id == null ||
      this.formBranchOffice.value.id == ""
    ) {
      this.branchOfficeService.save(this.formBranchOffice.value).subscribe({
        next: () => {
          this.showSuccessViaToast(),
            this.formBranchOffice.reset(),
            (this.busy = false),
            this.formBranchOffice.enable();
        },
        error: () => {
          this.showErrorViaToast(), (this.busy = false);
          this.formBranchOffice.enable();
        },
      });
    } else {
      this.update();
    }
  }

  load() {
    this.branchOfficeService.load().subscribe({
      next: (data) => {
        this.rows = data.content;
      },
      error: () => {
        this.showErrorViaToast();
      },
    });
  }

  edit(uuid: string) {
    this.navigation = "form";
    this.busy = true;
    this.branchOfficeService.findById(uuid).subscribe({
      next: (data) => {
        this.formBranchOffice.patchValue(data);
        this.busy = false;
      },
      error: () => {
        this.showSuccessViaToast();
        this.formBranchOffice.enable();
      },
    });
  }

  update() {
    this.busy = true;
    this.formBranchOffice.disable();
    this.branchOfficeService.update(this.formBranchOffice.value).subscribe({
      next: () => {
        this.showSuccessViaToast(),
          this.formBranchOffice.reset(),
          (this.busy = false),
          this.formBranchOffice.enable();
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
