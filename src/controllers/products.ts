import { type RequestHandler } from 'express';
import { Product} from '#models';
import type { ProductType } from '#types';
import mongoose, { Schema, model } from 'mongoose';
import '#db';

export const getProducts: RequestHandler = async (req, res) => {
  const products = await Product.find();

  res.json(products);
};

export const createProduct: RequestHandler = async (req, res) => {
  const { name, description, price, categoryId } = req.body as ProductType;

  if (!name || !description || !price || !categoryId) {
    throw new Error('Name, description, price, and category are required');
  }

  const found = await Product.findOne({ name });
  if (found) throw new Error('Product already exists');

  const product = await Product.create({ name, description, price, categoryId });

  res.json(product);
};



export const getProductById: RequestHandler = async (req, res) => {
  const {
    params: { id }
  } = req;
  const product = await Product.findById(id);
  if (!product) throw new Error('Product not found', { cause: 404 });

  res.json(product);
};

export const updateProduct: RequestHandler = async (req, res) => {
  const {
    body,
    params: { id }
  } = req;
  const { name, description, price, categoryId } = body as ProductType;
  if (!name || !description || !price || !categoryId) throw new Error('Name, description, price, and category are required');

  const product = await Product.findById(id);
  if (!product) throw new Error('Product not found', { cause: 404 });

  product.name = name;
  product.description = description;
  product.price = price;
  product.categoryId = categoryId;
  await product.save();

  res.json(product);
};


export const deleteProduct: RequestHandler = async (req, res) => {
  const {
    params: { id }
  } = req;

  const product = await Product.findByIdAndDelete(id);
  if (!product) throw new Error('Product not found', { cause: 404 });

  res.json({ message: 'Product deleted' });
};


    // name: {
    //     type: String,
    //     //required: [true, 'Name is required'],
    //     trim: true
    // },
    //  description: {
    //     type: String,
    //     //required: [true, 'Description is required'],
    //     trim: true
    // },
    // price: {
    //     type: Number,
    //     //required: [true, 'Price is required'],
    //     min: [0, 'Price must be a positive number']
    // },
    // categoryId: {
    //     type: Schema.Types.ObjectId, // Hier Mongoose-Laufzeittyp festlegen
    //     ref: 'Category',
    //     //required: [true, 'Category is required']
    // }    