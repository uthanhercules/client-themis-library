interface IControlBoard {
  src: string;
  alt: string;
  span: string;
  color: string;
}

interface IFiveProcedures {
  lawsuitName: string;
  customerName: string;
  lawsuitNumber: string;
  dateUpdated: string;
}

interface ILoginInput {
  className: string;
  type: string;
  placeholder: string;
  action: any;
}

export type { IControlBoard, IFiveProcedures, ILoginInput };
