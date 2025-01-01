import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectToDB } from "./src/db/connectToDB";

// Routes
import userRoutes from "./src/routes/user.route";

const app = express();

connectToDB();
app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
