export interface PageableGroup {
  content?: [Group],
  empty?: boolean,
  first?: boolean,
  last?: boolean,
  number?: number,
  numberOfElements?: number
}

export interface Group {
  id?: string;
  name?: string;
}
