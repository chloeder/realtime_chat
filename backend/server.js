import express from "express";
import { PORT } from "./constants/index.js";
import authRoutes from "./routes/auth.js";
import connectDB from "./db/mongodb.js";
const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
