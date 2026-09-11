import { type RequestHandler } from 'express';
import { Category } from '#models';
import type { CategoryType, UserType } from '#types'; //?UserType is imported but not used in this file, consider removing it if not needed
//import mongoose, { Schema, model } from 'mongoose'; //?mongoose, Schema, and model are imported but not used in this file, consider removing them if not needed
import '#db';

export const getCategory: RequestHandler = async (req, res) => {
  const categories = await Category.find();

  res.json(categories);
};

export const createCategory: RequestHandler = async (req, res) => {
  const { name } = req.body as CategoryType;

  if (!name) throw new Error('Name is required');

    //ggf. nicht nötig, da name unique ist und Mongoose automatisch einen Fehler wirft, wenn ein Duplikat erstellt wird
//    const found = await Category.findOne({ name });
//   if (found) throw new Error('Category already exists');

   const category = await Category.create({ name });

   res.json(category);
};

export const getCategoryById: RequestHandler = async (req, res) => {
  const {
    params: { id }
  } = req;
  const category = await Category.findById(id);
  if (!category) throw new Error('Category not found', { cause: 404 });

  res.json(category);
};

export const updateCategory: RequestHandler = async (req, res) => {
  const {
    body,
    params: { id }
  } = req;
  const { name } = body as CategoryType;
  if (!name) throw new Error('Name is required');

  const category = await Category.findById(id);
  if (!category) throw new Error('Category not found', { cause: 404 });

  category.name = name;
  await category.save();

  res.json(category);
};

export const deleteCategory: RequestHandler = async (req, res) => {
  const {
    params: { id }
  } = req;

  const category = await Category.findByIdAndDelete(id);
  if (!category) throw new Error('Category not found', { cause: 404 });

  res.json({ message: 'Category deleted' });
};
