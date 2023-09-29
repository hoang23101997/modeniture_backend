/** @format */

import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});
const UserModel = mongoose.model("users", UserSchema);
export default UserModel;
