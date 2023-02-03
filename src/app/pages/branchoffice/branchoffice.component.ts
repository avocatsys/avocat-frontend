import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Customer } from "src/app/demo/domain/customer";
import { CustomerService } from "src/app/demo/service/customerservice";
import { BranchOfficeService } from "src/app/services/branch-office.service";

@Component({
  selector: "app-branchoffice",
  templateUrl: "./branchoffice.component.html",
})
export class BranchofficeComponent implements OnInit {
  customers1: Customer[];

  navigation: string = "";

  loading: boolean = true;

  formBranchOffice: FormGroup;

  constructor(
    private fb: FormBuilder,
    private branchOfficeService: BranchOfficeService,
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
      this.loading = false;
    });
  }

  save() {
    this.branchOfficeService.save(this.formBranchOffice.value).subscribe({
      next: () => {},
      error: () => {},
    });
  }
}
