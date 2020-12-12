import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  passwordConfirm: string;
  firstName: string;
  lastName: string;
}

const userSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  passwordConfirm: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

export default mongoose.model<IUser>('User', userSchema);
