import { dbConnection } from 'lib/db';
import CategoryModel from 'models/Category.model';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    await dbConnection();

    const categories = await CategoryModel.find();

    res.status(200).json({ categories });
  }
}
