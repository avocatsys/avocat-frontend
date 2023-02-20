import { BranchOffice } from "./branch-office.models";
import { Group } from "./group.models";
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
    name?: string;
    username?: string;
    password?: string;
    privileges?: Privilege[];
    branchOffice?: BranchOffice;
    group?: Group    
}