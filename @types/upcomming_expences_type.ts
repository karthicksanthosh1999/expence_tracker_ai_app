import { IBank } from "./bankTypes";

export interface ICategory {
    id :string;
    title : string;
    userId : string
}


export interface IUpcommingExpencesType {
        id?:string;
        subject: string;
        category: string;
        bankData?: IBank
        categoryData?: ICategory;
        bankType:string;
        amount: number;
        paymentDate: string;
        userId?: string;
        status?: string
    }

export interface upcommingExpencesResponseType {
    message : string,
    error? : string,
    response : IUpcommingExpencesType[]
}

export interface upcommingSingleExpencesResponseType {
    message : string,
    error? : string,
    response : IUpcommingExpencesType
}