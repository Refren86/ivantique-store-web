import { dbConnection } from 'lib/db';
import CategoryModel from 'models/Category.model';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const categoryData = JSON.parse(req.body);
    await dbConnection();

    const newCategory = await CategoryModel.create(categoryData);

    res.status(200).json({ category: newCategory });
  }
}
