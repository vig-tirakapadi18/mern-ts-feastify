import express, { Response } from "express";
import cors from "cors";
import "dotenv/config";
import { connectToDB } from "./src/db/connectToDB";
import { connectToCloudinary } from "./src/db/connectToCloudinary";

// Routes
import userRoutes from "./src/routes/user.route";
import restaurantRoutes from "./src/routes/restaurant.route";
import searchRoutes from "./src/routes/search.route";
import orderRoutes from "./src/routes/order.route";

const app = express();
app.use(cors());

// Connect to MongoDB and Cloudinary databases before starting the server
connectToDB();
connectToCloudinary();

app.use("/api/orders/checkout/webhook", express.raw({ type: "*/*" }));
app.use(express.json());

app.get("/", (req, res: Response) => {
  res.json({ message: "Server health is GREAT!" });
});

app.use("/api/users", userRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
