import { Schema, model } from 'mongoose';
const productSchema = new Schema({
    name: {
        type: String,
        //required: [true, 'Name is required'],
        trim: true
    },
     description: {
        type: String,
        //required: [true, 'Description is required'],
        trim: true
    },
    price: {
        type: Number,
        //required: [true, 'Price is required'],
        min: [0, 'Price must be a positive number']
    },
    categoryId: {
        type: Schema.Types.ObjectId, // Hier Mongoose-Laufzeittyp festlegen
        ref: 'Category',
        required: [true, 'Category is required']
    }    
}, {
   // timestamps: true
});
export default model('Product', productSchema);