export interface IMachineAttribute {
  uid: string;
  value: any;
}
export interface IAttribute {
  uid: string;
  name: string;
  value: any;
  description?: string;
  type: string;
  canBeRemoved?: boolean;
  required?: boolean;
  belongTo?: string;
}

export interface IMachine {
  uid: string;
  name: string;
  description?: string;
  titleAttribute?: string;
  category: string;
  attributes: any;
}
export interface ICategory {
  uid: string;
  name: string;
  description?: string;
  titleAttribute: string;
}
