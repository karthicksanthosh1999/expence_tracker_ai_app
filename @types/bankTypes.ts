export interface IBank {
  id?: string;
  title: string;
  accountNo: string;
  ifcode: string;
  location: string;
  userId?: string;
}

export interface IBankResponseType {
  message: string;
  error?: string;
  response: IBank[];
}

export interface ISingleBankResponseType {
  message: string;
  error?: string;
  response: IBank;
}
