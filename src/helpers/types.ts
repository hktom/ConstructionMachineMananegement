export interface IAttribute {
  name: string;
  value: any;
  description?: string;
  type: string;
  machine?: string;
}

export interface IMachine {
  id: string;
  name: string;
  description?: string;
  titleAttribute?: string;
  category: string;
}
export interface ICategory {
  id: string;
  name: string;
  description?: string;
  titleAttribute: string;
}
