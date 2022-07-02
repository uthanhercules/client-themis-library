export interface ICustomer {
  id: string;
  full_name: string;
  email: string;
}

export interface IDeleteCustomerData {
  id: string;
}

export interface ICreateCustomer {
  full_name: string;
  email: string;
}
