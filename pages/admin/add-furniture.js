import {
  AdminLayout,
  AdminFurnitureForm,
} from 'components';
import { secrets } from 'utils/constants';

export const getStaticProps = async () => {
  const data = await fetch(`${secrets.BASE_URL}/api/admin/get-options`).then(
    (res) => res.json()
  );

  return {
    props: {
      options: {
        styles: data.styles,
        centuries: data.centuries,
        countries: data.countries,
        materials: data.materials,
        categories: data.categories,
      },
    },
    revalidate: 60, // Number of seconds before revalidating the data
  };
};

const AddFurniturePage = ({ options }) => {
  return (
    <AdminLayout>
      <AdminFurnitureForm options={options} />
    </AdminLayout>
  );
};

AddFurniturePage.auth = true;

export default AddFurniturePage;
