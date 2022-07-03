export interface IProcedure {
  procedure_number: string;
  customer_id: string;
  customer_name: string;
  name: string;
  updated: string;
}

export interface IDeleteProcedureData {
  procedure_number: string;
}

export interface ILastProcedure {
  procedure_number: string;
  customer_name: string;
  name: string;
  updated: string;
}