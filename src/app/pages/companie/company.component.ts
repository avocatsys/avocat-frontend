import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { BranchOffice } from "src/app/models/branch-office.models";
import { Company } from "src/app/models/company.models";
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

  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: MessageService,
    private userService: CompanyService,
    private branchOfficeService: BranchOfficeService
  ) {}

  ngOnInit(): void {
    this.load();
    //this.loadBranchOffices();

    this.formGroup = this.fb.group({
      id: [null],
      name: [
        "",
        Validators.compose([
          Validators.required,
          Validators.min(5),
          Validators.max(250),
        ]),
      ],
      cpfCnpj: [
        "",
        Validators.compose([
          Validators.required,
          Validators.min(5),
          Validators.max(250),
        ]),
      ],
      billingEmail: [
        null,
        Validators.compose([
          Validators.required,
          Validators.min(5),
          Validators.max(250),
        ]),
      ],
      description: [
        null,
        Validators.compose([
          Validators.required,
          Validators.min(5),
          Validators.max(250),
        ]),
      ],
      stateRegistration: [
        null,
        Validators.compose([
          Validators.required,
          Validators.min(5),
          Validators.max(250),
        ]),
      ],
      //empresas tipos
      issueDay: [
        null,
        Validators.compose([
          Validators.required,
          Validators.min(5),
          Validators.max(250),
        ]),
      ],
      dueDate: [
        null,
        Validators.compose([
          Validators.required,
          Validators.min(5),
          Validators.max(250),
        ]),
      ],
      maturityTerm: [
        null,
        Validators.compose([
          Validators.required,
          Validators.min(5),
          Validators.max(250),
        ]),
      ],
    });
  }

  save() {
    this.busy = true;
    this.formGroup.disable();
    if (this.formGroup.value.id == null || this.formGroup.value.id == "") {
      
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
