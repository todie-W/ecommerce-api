import { Types } from 'mongoose';

export type UserType = {
  name: string;
  email: string;
  password: string;
};

export type ProductType = {
  name: string;
  description: string;
  price: number;
  categoryId: Types.ObjectId;
};

export type CategoryType = {
  name: string;
};

export type OrderType = {
  userId: Types.ObjectId;
  products: {
    productId: Types.ObjectId;
    quantity: number;
  }[];
  quantity: number;
  total: number;
  timestamps?: {
    createdAt: Date;
    updatedAt: Date;
  };
};

 	//OrderType Fields: userId (ObjectId ref to User), products (array of { productId: ObjectId, quantity: number }), total (number), plus timestamps.


 //?type: Schema.Types.ObjectId, // Hier Mongoose-Laufzeittyp festlegen





 