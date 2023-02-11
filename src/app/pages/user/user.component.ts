import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { BranchOffice } from "src/app/models/branch-office.models";
import { Privilege } from "src/app/models/privilege.models";
import { User } from "src/app/models/user.models";
import { BranchOfficeService } from "src/app/services/branch-office.service";
import { PrivilegeService } from "src/app/services/privilege.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  providers: [MessageService, PrivilegeService, BranchOfficeService],
})
export class UserComponent implements OnInit {
  navigation: string = "";

  busy: boolean = false;

  pageTitle = "Usuários";

  rows: User[];

  valCheck: string[];

  privilegesOptions: Privilege[];

  branchOfficeDrop: BranchOffice[];

  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: MessageService,
    private groupService: UserService,
    private privilegeService: PrivilegeService,
    private branchOfficeService: BranchOfficeService
  ) {}

  ngOnInit(): void {
    this.load();
    this.loadPrivileges();
    this.loadBranchOffices();

    this.formGroup = this.fb.group({
      id: [null],
      username: [
        "",
        Validators.compose([
          Validators.required,
          Validators.min(5),
          Validators.max(250),
        ]),
      ],
      password: [null],
      branchOffice: [
        null,
        Validators.compose([
          Validators.required,
          Validators.min(5),
          Validators.max(250),
        ]),
      ],
      privileges: [
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

      let privilegeArray = [];
      this.valCheck.map((i) => {
        let privilege = this.getPrivileges(i);
        privilegeArray.push(privilege);
      });

      this.formGroup.get("privileges").setValue(privilegeArray);
      this.formGroup.get("password").setValue(this.getPasswordMock());

      this.groupService.save(this.formGroup.value).subscribe({
        next: () => {
          this.showSuccessViaToast(),
            this.formGroup.reset(),
            (this.busy = false),
            this.formGroup.enable();
        },
        error: () => {
          this.showErrorViaToast(), (this.busy = false);
          this.formGroup.enable();
        },
      });
    } else {
      this.update();
    }
  }

  load() {
    this.groupService.load().subscribe({
      next: (data) => {
        this.rows = data.content;        
      },
      error: () => {
        this.showErrorViaToast();
      },
    });
  }

  loadPrivileges() {
    this.privilegeService.load().subscribe({
      next: (data) => {
        this.privilegesOptions = data.content;
      },
      error: () => {
        this.showErrorViaToast();
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
    this.busy = true;
    this.formGroup.enable();
    this.groupService.findById(uuid).subscribe({
      next: (data) => {
        this.formGroup.patchValue(data);
        this.busy = false;
      },
      error: () => {
        this.showSuccessViaToast();
        this.formGroup.enable();
      },
    });
  }

  update() {
    this.busy = true;
    this.formGroup.disable();
    this.groupService.update(this.formGroup.value).subscribe({
      next: () => {
        this.showSuccessViaToast(),
          this.formGroup.reset(),
          (this.busy = false),
          this.formGroup.enable();
      },
      error: () => {
        this.showErrorViaToast(), (this.busy = false);
      },
    });
  }

  getPrivileges(id: string) {
    return this.privilegesOptions.filter((i) => i.id == id)[0];
  }

  getPasswordMock(): string {
    return Math.random().toString(36).slice(-8);
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
