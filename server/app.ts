import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectToDB } from "./src/db/connectToDB";

const app = express();

connectToDB();
app.use(express.json());
app.use(cors());

app.get("/test", (req, res) => {
  res.json({ message: "It is working!" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
