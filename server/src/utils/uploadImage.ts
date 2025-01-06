import { v2 as cloudinary } from "cloudinary";

export const uploadImage = async (file: Express.Multer.File) => {
  const img = file;
  const base64Image = Buffer.from(img.buffer).toString("base64");
  const dataUri = `data:${img.mimetype};base64,${base64Image}`;

  const imgUploadResponse = await cloudinary.uploader.upload(dataUri);

  return imgUploadResponse.url;
};
