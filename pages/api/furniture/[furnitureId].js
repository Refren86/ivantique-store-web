import { dbConnection } from 'lib/db';
import FurnitureModel from 'models/Furniture.model';
import MaterialModel from 'models/Material.model';
import CountryModel from 'models/Country.model';
import StyleModel from 'models/Style.model';
import CenturyModel from 'models/Century.model';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const params = req.query;

    await dbConnection();

    const furniture = await FurnitureModel.findById(
      params.furnitureId
    ).populate(['materials', 'country', 'style', 'century']);

    res.status(200).json({ furniture });
  }
}
