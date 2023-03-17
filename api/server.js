import express from "express";
const app = express();
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/dbconfig.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";
import productRoutes from "./routes/productRoute.js";
//CONFIGS
dotenv.config();

//MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//ROUTES
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//REST API
// app.get("/", (req, res) => {
//   res.json({ msg: "welcome to server" });
// });

//DB CONFIG
const port = process.env.PORT || 8080;
connectDB(process.env.MONGO_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server on port:${port}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
