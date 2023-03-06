import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { Company } from "src/app/models/company.models";
import { Contract } from "src/app/models/contract.models";
import { ContractService } from "src/app/services/contract.service";

@Component({
  selector: "app-contract",
  templateUrl: "./contract.component.html",
  providers: [ContractService],
})
export class ContractComponent {
  navigation = "";

  display: boolean;

  busy: boolean = false;

  pageTitle = "Contratos";

  rows: Contract[];

  selectedCompanyId: string;

  displayCompany: string;

  companies: Company[];

  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: MessageService,
    private contractService: ContractService
  ) {}

  ngOnInit(): void {
    this.load();

    this.formGroup = this.fb.group({
      id: [null],
      name: [
        null,
        Validators.compose([Validators.required, Validators.max(100)]),
      ],
      annotationBilling: [
        null,
        Validators.compose([Validators.required, Validators.max(20)]),
      ],
      generalNote: [
        null,
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.max(100),
        ]),
      ],
      adjustmentDate: [
        null,
        Validators.compose([Validators.required, Validators.max(2000)]),
      ],
      closingDate: [
        null,
        Validators.compose([
          Validators.required,
          Validators.min(5),
          Validators.max(250),
        ]),
      ],
      company: [null, Validators.required],
    });
  }

  save() {
    this.busy = true;
    this.formGroup.disable();
    if (this.formGroup.value.id == null || this.formGroup.value.id == "") {
      this.contractService.save(this.formGroup.value, this.selectedCompanyId).subscribe({
        next: () => {
          this.showSuccessViaToast(), this.clear();
        },
        error: () => {
          this.showErrorViaToast(), (this.busy = false), this.clear();
        },
      });
    } else {
      this.update();
    }
  }

  load() {
    this.busy = true;
    this.contractService.load().subscribe({
      next: (data) => {
        this.rows = data.content;
        this.busy = false;
      },
      error: () => {
        this.showErrorViaToast();
        this.busy = false;
      },
    });
  }

  delete(uuid: string) {
    if (confirm("Deseja realmente excluir o item?")) {
      this.contractService.delete(uuid).subscribe({
        next: () => {
          this.showSuccessViaToast();
          this.load();
          this.busy = false;
        },
        error: () => {
          this.showErrorViaToast();
          this.busy = false;
        },
      });
    }
  }

  edit(uuid: string) {
    this.navigation = "form";
    this.formGroup.enable();
    this.contractService.findById(uuid).subscribe({
      next: (data) => {
        this.formGroup.patchValue(data);
        this.busy = false;
      },
      error: () => {
        this.showErrorViaToast();
        this.busy = false;
      },
    });
  }

  update() {
    this.busy = true;
    this.formGroup.disable();
    this.contractService.update(this.formGroup.value).subscribe({
      next: () => {
        this.showSuccessViaToast(), this.clear();
      },
      error: () => {
        this.showErrorViaToast(), (this.busy = false);
      },
    });
  }

  selectedCompany(company: Company) {
    console.log("acionou o método no pai!");
    console.log(company);
    this.selectedCompanyId = company.id;
    this.displayCompany = company.name; 
    this.display = false;
  }

  clear() {
    this.formGroup.reset();
    this.busy = false;
    this.formGroup.enable();
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
