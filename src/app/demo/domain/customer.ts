export interface Country {
    name?: string;
    code?: string;
}

export interface Representative {
    name?: string;
    image?: string;
}

export interface Customer {
    id?: number;
    name?: string;
    country?: Country;
    company?: string;
    date?: string;
    status?: string;
    activity?: number;
    representative?: Representative;
}

//todo depois remover tudo que esta acima dessa linha.

export interface Login {
    username?: string;
    password?: string
}

export interface NewCustomer {
    id?: string;
    fullName?: string;
    officeName?: string;
    email?: string;    
}