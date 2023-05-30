import formidable from 'formidable';
import cloudinary from 'lib/cloudinary';

export const config = {
  api: {
    bodyParser: false, // Disable the default Next.js bodyParser
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    const { folder } = req.query;

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({ message: 'Bad Request' });
      }

      try {
        const uploadedImages = await Promise.all(
          Object.values(fields).map((base64Image) => {
            return new Promise((resolve, reject) => {
              cloudinary.uploader.upload(
                base64Image,
                { folder },
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

        res.status(201).json({ images: uploadedImages });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
  }
}
