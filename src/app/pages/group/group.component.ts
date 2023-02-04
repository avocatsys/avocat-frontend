import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { Group } from "src/app/models/group.models";
import { GroupService } from "src/app/services/group.service";

@Component({
  selector: "app-group",
  templateUrl: "./group.component.html",
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
  providers: [MessageService, GroupService],
})
export class GroupComponent implements OnInit {
  rows: Group[];

  navigation: string = "";

  busy: boolean = false;

  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: MessageService,
    private groupService: GroupService
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

  save() {
    this.busy = true;
    this.formGroup.disable();
    if (
      this.formGroup.value.id == null ||
      this.formGroup.value.id == ""
    ) {
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
