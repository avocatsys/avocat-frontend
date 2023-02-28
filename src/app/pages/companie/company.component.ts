import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { BranchOffice } from "src/app/models/branch-office.models";
import { Company } from "src/app/models/company.models";
import { DropDown } from "src/app/models/dropdown.models";
import { BranchOfficeService } from "src/app/services/branch-office.service";
import { CompanyService } from "src/app/services/company.service";

@Component({
  selector: "app-company",
  templateUrl: "./company.component.html",
  providers: [CompanyService],
})
export class CompanyComponent implements OnInit {
  navigation: string = "";

  busy: boolean = false;

  pageTitle = "Empresas/Pessoas";

  rows: Company[];

  valCheck: string[];

  branchOfficeDrop: BranchOffice[];

  companyTypes: DropDown[];

  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: MessageService,
    private userService: CompanyService,
    private branchOfficeService: BranchOfficeService
  ) {}

  ngOnInit(): void {
    this.load();
    this.loadBranchOffices();
    this.loadCompanyTypes();

    this.formGroup = this.fb.group({
      id: [null],
      name: [
        null,
        Validators.compose([Validators.required, Validators.max(100)]),
      ],
      cpfCnpj: [
        null,
        Validators.compose([Validators.required, Validators.max(20)]),
      ],
      billingEmail: [
        null,
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.max(100),
        ]),
      ],
      description: [
        null,
        Validators.compose([Validators.required, Validators.max(2000)]),
      ],
      stateRegistration: [
        null,
        Validators.compose([
          Validators.required,
          Validators.min(5),
          Validators.max(250),
        ]),
      ],
      companyTypes: [null, Validators.required],
      issueDay: [null, Validators.compose([Validators.max(2)])],
      dueDate: [null, Validators.compose([Validators.max(2)])],
      maturityTerm: [null, Validators.compose([Validators.max(2)])],
      branchOffice: [null, Validators.required],
    });
  }

  save() {
    this.busy = true;
    this.formGroup.disable();
    if (this.formGroup.value.id == null || this.formGroup.value.id == "") {

      this.formGroup.value.companyTypes = this.formGroup.value.companyTypes.value.code;

      this.userService.save(this.formGroup.value).subscribe({
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
    this.userService.load().subscribe({
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

  loadBranchOffices() {
    this.branchOfficeService.load().subscribe({
      next: (data) => {
        this.branchOfficeDrop = data.content;
      },
      error: () => {
        this.showErrorViaToast();
      },
    });
  }

  loadCompanyTypes() {
    this.companyTypes = [
      {
        name: "PESSOA FÍSICA",
        code: "FISICA",
      },
      {
        name: "PESSOA JURÍDICA",
        code: "JURIDICA",
      },
    ];
  }

  edit(uuid: string) {
    this.navigation = "form";
    this.formGroup.enable();
    this.userService.findById(uuid).subscribe({
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
    this.userService.update(this.formGroup.value).subscribe({
      next: () => {
        this.showSuccessViaToast(), this.clear();
      },
      error: () => {
        this.showErrorViaToast(), (this.busy = false);
      },
    });
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
