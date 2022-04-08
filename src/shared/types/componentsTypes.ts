interface IControlBoard {
  src: string,
  alt: string,
  span: string,
  color: string
}

interface IFiveProcedures {
  identificador: string,
  name: string,
  lawsuit: string,
  lastupdate: string
}

interface ILoginInput {
  className: string,
  type: string,
  placeholder: string,
  action: any,
}

export type {
  IControlBoard,
  IFiveProcedures,
  ILoginInput,
};
