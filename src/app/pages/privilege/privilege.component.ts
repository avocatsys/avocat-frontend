import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { Group } from "src/app/models/group.models";
import { PrivilegeService } from "src/app/services/privilege.service";

@Component({
  selector: "app-privilege",
  templateUrl: "./privilege.component.html",
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
  providers:[MessageService, PrivilegeService]
})
export class PrivilegeComponent implements OnInit {

  rows: Group[];

  busy: boolean = false;

  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: MessageService,
    private privilegeService: PrivilegeService
  ) {}

  ngOnInit(): void {
    this.load();

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
    });
  }

  load() {
    this.privilegeService.load().subscribe({
      next: (data) => {
        this.rows = data.content;
      },
      error: () => {
        this.showErrorViaToast();
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
