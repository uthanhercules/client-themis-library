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
