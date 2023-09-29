/** @format */

import express from "express";
import "dotenv/config";
import router from "./routes/index.js";
import cors from "cors";
import connectToDB from "./utils/db.js";
import errorHandle from "./middleware/errorHandle.js";

const app = express();
// const whitelist = ['http://localhost:3000'];
// const corsOption = {
// 	origin: function (origin, callback) {
// 		if (whitelist.indexOf(origin) !== -1) {
// 			callback(null, true);
// 		} else {
// 			callback(new Error('Not allowed by CORS'));
// 		}
// 	},
// };
connectToDB();
app.use(express.json());
app.use(
  cors({
    origin: "https://modeniture.onrender.com",
    headers: {
      "Access-Control-Allow-Origin": "https://modeniture.onrender.com",
      "Access-Control-Allow-Credentials": true,
    },
  })
);
app.options("*", cors());
app.use("/api/v1", router);

// app.use(errorHandle);

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(`cannot start server by ${err}`);
  }
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
