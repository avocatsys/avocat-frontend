import { BranchOffice } from "./branch-office.models";
import { Privilege } from "./privilege.models";

export interface PageableUser {
    content?: [User],
    empty?: boolean,
    first?: boolean,
    last?: boolean,
    number?: number,
    numberOfElements?: number
  }

export interface User{
    id?: string;
    username?: string;
    password?: string;
    privileges?: string[];
    branchOffice?: BranchOffice;    
}