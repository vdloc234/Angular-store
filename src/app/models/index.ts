export interface IProduct {
  id: number;
  name: string;
  price: number;
  url: string | Blob;
  description: string;
}

export interface ICartProduct extends IProduct {
  quantity: string;
}
