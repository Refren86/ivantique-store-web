import { AdminLayout, AdminFurnitureForm } from 'components';
import { loadOptions } from 'lib/api';
import { useEffect, useState } from 'react';

// export const getStaticProps = async () => {
//   const data = await loadOptions();

//   return {
//     props: {
//       options: {
//         styles: data.styles,
//         centuries: data.centuries,
//         countries: data.countries,
//         materials: data.materials,
//         categories: data.categories,
//       },
//     },
//     revalidate: 60, // Number of seconds before revalidating the data
//   };
// };

const AddFurniturePage = () => {
  const [options, setOptions] = useState({
    styles: '',
    centuries: '',
    countries: '',
    materials: '',
    categories: '',
  });

  useEffect(() => {
    const getOptions = async () => {
      const data = await loadOptions();

      setOptions({
        styles: data.styles,
        centuries: data.centuries,
        countries: data.countries,
        materials: data.materials,
        categories: data.categories,
      });
    };

    getOptions();
  }, []);

  return (
    <AdminLayout>
      <AdminFurnitureForm options={options} />
    </AdminLayout>
  );
};

AddFurniturePage.auth = true;

export default AddFurniturePage;
