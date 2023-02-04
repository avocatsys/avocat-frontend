export interface PageablePrivilege {
  content?: [Privilege],
  empty?: boolean,
  first?: boolean,
  last?: boolean,
  number?: number,
  numberOfElements?: number
}

export interface Privilege {
  id?: string;
  name?: string;
}
