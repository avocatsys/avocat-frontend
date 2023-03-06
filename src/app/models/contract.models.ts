import { Customer } from "../demo/domain/customer";
import { Company } from "./company.models";

export interface PageableContract {
  content?: [Contract];
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
}

export interface Contract {
  name?: string;
  annotationBilling?: string;
  generalNote?: string;
  adjustmentDate?: Date;
  closingDate?: Date;
  company?: Company;
  customer?: Customer;
}
