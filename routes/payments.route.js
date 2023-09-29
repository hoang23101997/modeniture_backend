/** @format */

import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import PaymentModel from "../models/payments.model.js";
const paymentRouter = express.Router();

// get data payments by user id

paymentRouter.get("/", authMiddleware, async (req, res) => {
  const userId = req.query.id;

  try {
    const payments = await PaymentModel.find({ by: userId });

    res.status(200).json({
      data: payments,
      message: "Payment data",
      totalItems: payments.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
});

paymentRouter.post("/", async (req, res) => {
  const data = req.body;
  try {
    const newPayment = await PaymentModel.create({
      data,
    });

    newPayment.save();

    res.status(200).json({
      message: "Your Order Has Been Placed!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
});

paymentRouter.post("/member", authMiddleware, async (req, res) => {
  const user = req.user;

  const data = req.body;

  try {
    const newPayment = await PaymentModel.create({
      by: user.id,
      data,
    });

    newPayment.save();

    res.status(200).json({
      message: "Your Order Has Been Placed!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
});

export default paymentRouter;
