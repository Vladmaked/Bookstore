import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  category?: string;
  subcategory?: string;
  title?: string;
  author?: string;
  photo?: string;
  info?: string;
  price?: string;
  date?: Date;
  id?: string;
  quantityInStock?: number;
}

const productSchema: Schema = new Schema({
  category: String,
  subcategory: String,
  title: String,
  author: String,
  photo: String,
  info: String,
  price: String,
  date: Date,
  id: String,
  quantityInStock: Number,
});

export default mongoose.model<IProduct>('Product', productSchema);
