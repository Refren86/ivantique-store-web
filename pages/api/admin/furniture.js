import formidable from 'formidable';
import { v2 as cloudinary } from 'cloudinary';
import FurnitureModel from 'models/Furniture.model';
import mongoose from 'mongoose';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const config = {
  api: {
    bodyParser: false, // Disable the default Next.js bodyParser
  },
};

export default function handler(req, res) {
  return new Promise((resolve, reject) => {
    if (req.method === 'POST') {
      const form = new formidable.IncomingForm();

      form.parse(req, async (err, fields, files) => {
        if (err) {
          return reject({ status: 400, message: 'Bad Request' });
        }

        const { data, ...images } = fields;

        try {
          const uploadedImages = await Promise.all(
            Object.values(images).map((base64Image) => {
              return new Promise((resolve, reject) => {
                cloudinary.uploader.upload(
                  base64Image,
                  { folder: 'furnitures' },
                  (error, result) => {
                    if (error) {
                      reject(error);
                    } else {
                      resolve(result.secure_url);
                    }
                  }
                );
              });
            })
          );

          const parsedData = JSON.parse(data);
          const {
            title,
            description,
            oldPrice,
            newPrice,
            width,
            height,
            depth,
            style,
            century,
            country,
            materials,
          } = parsedData;

          // const newFurniture = await FurnitureModel.create({
          //   images: uploadedImages,
          //   title,
          //   description,
          //   oldPrice,
          //   newPrice,
          //   width,
          //   height,
          //   depth,
          //   style,
          //   century,
          //   country,
          //   materials,
          // });
          const newFurniture = new FurnitureModel({
            images: uploadedImages,
            title,
            description,
            oldPrice,
            newPrice,
            width,
            height,
            depth,
            style,
            century,
            country,
            materials,
          });

          newFurniture
            .save()
            .then((savedDocument) => {
              res.json({
                message: 'Furniture created successfully',
                data: savedDocument,
              });
              resolve();
            })
            .catch((error) => {
              reject(error);
            });
        } catch (error) {
          res.status(error.status || 500).json({ message: error.message });
          reject(error);
        }
      });
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
      resolve();
    }
  });
}
