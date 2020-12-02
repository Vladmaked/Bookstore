import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: String;
  password: String;
  passwordConfirm: String;
  firstName: String;
  lastName: String;
}

const userSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  passwordConfirm: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

export default mongoose.model<IUser>('User', userSchema);
