import cloudinary from 'lib/cloudinary';
import { extractPublicIdFromUrl } from 'helpers';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { images, folder } = JSON.parse(req.body);

    try {
      const deletionPromises = images.map((imageUrl) =>
        cloudinary.uploader.destroy(
          extractPublicIdFromUrl(imageUrl, folder)
        )
      );

      await Promise.all(deletionPromises);

      res.status(200).json({ message: 'Images deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete images', error });
    }
  } else {
    res.status(405).json({ message: 'HTTP method is not allowed' });
  }
}
