import mongoose from "mongoose";

export const connectToDB = () => {
  return mongoose
    .connect(process.env.MONGO_CONN_STR as string)
    .then(() => console.log("Connection established with MongoDB!"))
    .catch((err) => console.log(err));
};
