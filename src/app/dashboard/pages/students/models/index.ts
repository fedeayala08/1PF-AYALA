export interface Student{
    id: number,
    name: string,
    surname:string,
    gender: string,
    email:string,
    country:string
}

export interface StudentCreation{
    name: string,
    surname:string,
    gender: string,
    email:string,
    country:string
}

export interface StudentEdition{
    name?: string,
    surname?:string,
    gender?: string,
    email?:string,
    country?:string
}