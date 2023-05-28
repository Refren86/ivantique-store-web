import {
  AdminLayout,
  AdminFurnitureForm,
} from 'components';

export const getStaticProps = async () => {
  const data = await fetch(`http://localhost:3000/api/admin/get-options`).then(
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
