/** @format */

import { ObjectId } from "mongodb";
import mongoose from "mongoose";
const Payment = new mongoose.Schema({
  by: {
    type: ObjectId,
  },
  data: {
    type: Array,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});
const PaymentModel = mongoose.model("payments", Payment);
export default PaymentModel;
