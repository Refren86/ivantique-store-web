import { dbConnection } from 'lib/db';
import CategoryModel from 'models/Category.model';

export default async function handler(req, res) {
  await dbConnection();
  if (req.method === 'GET') {
    const categories = await CategoryModel.find();

    res.status(200).json({ categories });
  } else if (req.method === 'POST') {
    const categoryData = JSON.parse(req.body);
    await dbConnection();

    const newCategory = await CategoryModel.create(categoryData);

    res.status(200).json({ category: newCategory });
  } else if (req.method === 'DELETE') {
    const categoryId = JSON.parse(req.body);

    await CategoryModel.findByIdAndDelete(categoryId);
    res.status(200).json({ message: 'Category deleted' });
  }
}
