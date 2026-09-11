import { Schema, model } from 'mongoose';
const categorySchema = new Schema({
    name: {
        type: String,
        //required: [true, 'Name is required'],
        //trim: true
    }
}, {
   // timestamps: true
});
const Category = model('Category', categorySchema);
export { Category };
export default Category;//?