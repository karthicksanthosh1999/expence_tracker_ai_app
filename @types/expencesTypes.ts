import { IBank } from "./bankTypes";

export interface ICategory {
  id?: string;
  title: string;
  categoryType: string;
  userId?: string;
}

export interface ICategoryResponse {
  message: string;
  error?: string;
  response?: ICategory[];
}

export interface expencesType {
  id?: string;
  subject: string;
  category: string;
  bankData?: IBank;
  categoryData?: ICategory;
  bankType: string;
  amount: number;
  paymentDate: string;
  userId?: string;
}

export interface TExpencesResponseType {
  message: string;
  error?: string;
  responses: expencesType[];
}

export interface TSingleExpencesResponseType {
  message: string;
  error?: string;
  responses: expencesType;
}
