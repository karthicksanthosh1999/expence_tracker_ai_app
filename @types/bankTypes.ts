export interface IBank {
    id? :string;
    title : string;
    userId? : string
}

export interface upcommingBankResponseType {
    message : string,
    error? : string,
    response : IBank[]
}

export interface upcommingSingleBankResponseType {
    message : string,
    error? : string,
    response : IBank
}