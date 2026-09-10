import { type RequestHandler } from 'express';
import { Order } from '#models';
import type { OrderType } from '#types';
import mongoose, { Schema, model } from 'mongoose';
import '#db';


export const getOrders: RequestHandler = async (req, res) => {
  const orders = await Order.find();

  res.json(orders);
};


export const createOrder: RequestHandler = async (req, res) => {
  const { userId, products, quantity, total, timestamps } = req.body as OrderType;

  if (!userId || !products || products.length === 0 || quantity < 1 || !total)
    throw new Error('userId, products, quantity, and total are required');

  const order = await Order.create({ userId, products, total });  //quantity is calculated from products, so no need to store it separately
    
                                                                  //timestamps are automatically handled by Mongoose, so no need to pass them in the request body   
  res.json(order);
};

export const getOrderById: RequestHandler = async (req, res) => {
  const {
    params: { id } //? The id is extracted from the request parameters, which is used to find the specific order by its unique identifier
  } = req;
  const order = await Order.findById(id);
  if (!order) throw new Error('Order not found', { cause: 404 });

  res.json(order);
};

//? The updateOrder function is an Express request handler that updates an existing order in the database. It extracts the order ID from the request parameters and the updated order data from the request body. It checks if all required fields are present, finds the order by its ID, updates its properties, and saves the changes to the database. Finally, it returns the updated order as a JSON response.
export const updateOrder: RequestHandler = async (req, res) => {  
  const {
    body,
    params: { id } //? The id is extracted from the request parameters, which is used to find the specific order to update 
  } = req;
  const { userId, products, total } = body as OrderType;
  if (!userId || !products || products.length === 0 || !total) throw new Error('userId, products, and total are required');

  const order = await Order.findById(id);
  if (!order) throw new Error('Order not found', { cause: 404 });

  order.userId = userId; // Update the userId of the order
  order.set('products', products); // Use the set method to update the products array
  order.total = total;
  await order.save();  

  res.json(order); // Return the updated order as a JSON response
};

export const deleteOrder: RequestHandler = async (req, res) => {
  const {
    params: { id }
  } = req;

  const order = await Order.findByIdAndDelete(id);
  if (!order) throw new Error('Order not found', { cause: 404 });

  res.json({ message: 'Order deleted' });
};



// // 1. Beispiel-Daten, die vom Frontend oder Warenkorb kommen
// const userId = "65a1234567890abcdef12345";
// const products = [
//   { productId: "65b9876543210fedcba54321", quantity: 2, price: 19.99 }, // 2x 19.99 = 39.98
//   { productId: "65b5555555550fedcba11111", quantity: 1, price: 10.00 }  // 1x 10.00 = 10.00
// ];

// // 2. Berechnung von "price * quantity" für die Gesamtsumme (total)
// const total = products.reduce((sum, item) => {
//   return sum + (item.price * item.quantity);
// }, 0); // Ergebnis hier: 49.98

// // 3. Speichern in der MongoDB via Mongoose
// const order = await Order.create({ 
//   userId, 
//   products, // Mongoose speichert das komplette Array inklusive der Einzelpreise
//   total     // Die berechnete Gesamtsumme
// });





//   userId: {
//         type: Schema.Types.ObjectId, // Hier Mongoose-Laufzeittyp festlegen
//         ref: 'User'
//     },    
//      products: [
//     {
//       //_id: false, // Verhindert, dass Mongoose automatisch eine eigene _id für jedes Array-Element generiert: aber eigentlich statt _id -> id???
//       productId: {
//         type: Schema.Types.ObjectId,
//         ref: 'Product', // Name des referenzierten Models für .populate()
//         required: true
//       },
//       quantity: {
//         type: Number,
//         required: true,
//         min: [1, 'Die Menge muss mindestens 1 betragen.'],
//         default: 1
//       }
//     }
//   ],
//     total: {
//         type: Number,
//         //required: [true, 'Price is required'],
//         min: [0, 'Price must be a positive number']
//     }
   
// }, {
//     timestamps: true  //pus timestamps?



















//   userId: {
//         type: Schema.Types.ObjectId, // Hier Mongoose-Laufzeittyp festlegen
//         ref: 'User'
//     },    
//      products: [
//     {
//       //_id: false, // Verhindert, dass Mongoose automatisch eine eigene _id für jedes Array-Element generiert: aber eigentlich statt _id -> id???
//       productId: {
//         type: Schema.Types.ObjectId,
//         ref: 'Product', // Name des referenzierten Models für .populate()
//         required: true
//       },
//       quantity: {
//         type: Number,
//         required: true,
//         min: [1, 'Die Menge muss mindestens 1 betragen.'],
//         default: 1
//       }
//     }
//   ],
//     total: {
//         type: Number,
//         //required: [true, 'Price is required'],
//         min: [0, 'Price must be a positive number']
//     }
   
// }, {
//     timestamps: true  //pus timestamps?