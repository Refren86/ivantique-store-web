import { dbConnection } from 'lib/db';

import StyleModel from 'models/Style.model';
import CenturyModel from 'models/Century.model';
import CountryModel from 'models/Country.model';
import MaterialModel from 'models/Material.model';
import CategoryModel from 'models/Category.model';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', process.env.BASE_URL);

  if (req.method === 'GET') {
    await dbConnection();

    const getStyles = StyleModel.find();
    const getCenturies = CenturyModel.find();
    const getCountries = CountryModel.find();
    const getMaterials = MaterialModel.find();
    const getCategories = CategoryModel.find();

    const [styles, centuries, countries, materials, categories] =
      await Promise.all([
        getStyles,
        getCenturies,
        getCountries,
        getMaterials,
        getCategories,
      ]);

    res
      .status(200)
      .json({ styles, centuries, countries, materials, categories });
  }
}
