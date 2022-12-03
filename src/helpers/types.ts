export interface IAttribute {
  name: string;
  description: string;
  type: string;
}

export interface IMachine {
  id: string;
  name: string;
  attributes: IAttribute[];
}
