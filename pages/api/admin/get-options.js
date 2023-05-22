import StyleModel from 'models/Style.model';
import CenturyModel from 'models/Century.model';
import CountryModel from 'models/Country.model';
import MaterialModel from 'models/Material.model';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const getStyles = StyleModel.find();
    const getCenturies = CenturyModel.find();
    const getCountries = CountryModel.find();
    const getMaterials = MaterialModel.find();

    const [styles, centuries, countries, materials] = await Promise.all([
      getStyles,
      getCenturies,
      getCountries,
      getMaterials,
    ]);

    res.status(200).json({ styles, centuries, countries, materials });
  }
}
