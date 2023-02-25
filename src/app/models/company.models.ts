import { Customer } from "../demo/domain/customer";

export interface PageableCompany {
  content?: [Company];
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
}

export interface Company {
  id?: string;
  name?: string;
  cpfCnpj?: string;
  billingEmail?: string;
  description?: string;
  companyTypes?: string;
  stateRegistration?: string;
  issueDay?: number;
  dueDate?: number;
  maturityTerm?: string;
  customer: Customer
}
