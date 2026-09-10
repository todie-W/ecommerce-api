import { Schema, model } from 'mongoose';
//import { z } from 'zod'; -> schemas
//ggf. hier userSchema umbenennen, wie userModelSchema 
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
       // match: [/^\S+@\S+\.\S+$/, 'Email is not valid']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
       // select: false,
       // minlength: [6, 'Password must be at least 6 characters long']
    }
}, {
   // timestamps: true
});
export default model('User', userSchema);


// export const userSchema = z.object({
//   name: z.string().trim().optional(),
//   email: z.email(),
//   password: z.string().min(6),
// });


// const userModelSchema = new Schema({
//   name: String,
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });