export interface ISalary {
    id? : string
    amount : number
    salaryDate : string
    userId? : string
    bankType : string
}

type IFilterSalary = {
    month: string,
    salary: number,
    expences: number,
    net : number
}

export interface IFilterSalaryResponse {
    message : string;
    error? : any;
    response : IFilterSalary[]
}