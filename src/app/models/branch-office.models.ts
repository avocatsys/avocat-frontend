export interface Pageable {
  content?: [BranchOffice],
  empty?: boolean,
  first?: boolean,
  last?: boolean,
  number?: number,
  numberOfElements?: number
}


export interface BranchOffice {
  id?: string;
  corporateName?: string;
  branchOfficeName?: string;
  codeOffice?: string;
  stateRegistration?: string;
  cpfCnpj?: string;
  email?: string;
}
