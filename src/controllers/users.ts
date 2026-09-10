import { type RequestHandler } from 'express';
import type { z } from 'zod/v4';
import { User } from '#models';
import type { UserType } from '#types';
import { isValidObjectId, type Types } from 'mongoose';
//import { Types } from 'mongoose';
import type { userSchema } from '#schemas';

// wird so zod hier durchgeführt? wird userSchma hier bekommen?
type UserInputDTO = z.input<typeof userSchema>;
type UserDTO = UserInputDTO & {
  _id: InstanceType<typeof Types.ObjectId>;
};
type IdParams = {
  id: string;
};

export const getUsers: RequestHandler = async (req, res) => {
  const users = await User.find();

  res.json(users);
};

export const createUser: RequestHandler <{}, UserDTO, UserInputDTO> = async (req, res) => {
  const {
    body: { email }
  } = req;
  const found = await User.findOne({ email });

  if (found) throw new Error('Email already exists', { cause: { status: 400 } });

  const user = await User.create(req.body satisfies UserInputDTO);

  res.status(201).json(user);
};




// export const createUser: RequestHandler = async (req, res) => {
//   const { name, email, password } = req.body as UserType;

//   if (!name || !email || !password)
//     throw new Error('name, email, password are required');

//   const found = await User.findOne({ email });
//   if (found) throw new Error('User already exists');

//   const user = await User.create({ name, email, password});

//   res.json(user);
// };

export const getUserById: RequestHandler = async (req, res) => {
  const {
    params: { id }
  } = req;
  const user = await User.findById(id);
  if (!user) throw new Error('User not found', { cause: 404 });

  res.json(user);
};


export const updateUser: RequestHandler<IdParams, UserDTO, UserInputDTO> = async (req, res) => {
  const {
    body,
    params: { id }
  } = req;
   if (!isValidObjectId(id)) throw new Error('Invalid id', { cause: { status: 400 } });

  const user = await User.findByIdAndUpdate(id, body, { new: true }).lean();

  if (!user) throw new Error('User not found', { cause: { status: 404 } });

  res.json(user);
};

// export const updateUser: RequestHandler = async (req, res) => {
//   const {
//     body,
//     params: { id }
//   } = req;
//   const { name, email } = body as UserType;
//   if (!name || !email) throw new Error('name, email required');

//   const user = await User.findById(id);
//   if (!user) throw new Error('User not found', { cause: 404 });

//   user.name = name;
//   user.email = email;
//   await user.save();

//   res.json(user);
// };

export const deleteUser: RequestHandler = async (req, res) => {
  const {
    params: { id }
  } = req;

  const user = await User.findByIdAndDelete(id);
  if (!user) throw new Error('User not found', { cause: 404 });

  res.json({ message: 'User deleted' });
};

