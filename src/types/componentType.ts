import { ICustomer } from './customerTypes';
import { IProcedure } from './procedureTypes';

export interface IMainInput {
  action: any;
  placeholder: string;
  type: string;
  value: string;
}

export interface IMainButton {
  type: 'button' | 'submit' | 'reset' | undefined;
  label: string;
  action?: any;
}

export interface IActionButton {
  icon: string;
  alt: string;
  label: string;
  action: any;
  color: string;
}

export interface IProcecdureList {
  lawsuitList: IProcedure[];
}

export interface IProcecdureListDetail {
  lawsuitList: IProcedure[];
  deleteAction: any;
  editAction: any;
  action: any;
}

export interface ICustomerListDetail {
  customerList: ICustomer[];
  deleteAction: any;
  editAction: any;
  action: any;
}
