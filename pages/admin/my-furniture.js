import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

import { loadFurniture } from 'lib/api';
import { AdminLayout, FurnitureCard } from 'components';

// export const getStaticProps = async () => {
//   const furnitureData = await fetch(
//     secrets.BASE_URL + '/api/admin/furniture'
//   ).then((res) => res.json());

//   return {
//     props: {
//       furnitureData,
//     },
//     revalidate: 60,
//   };
// };

const MyFurniturePage = () => {
  const { data: session } = useSession();
  const [furniture, setFurniture] = useState([]);

  useEffect(() => {
    const getFurniture = async () => {
      const data = await loadFurniture();
      setFurniture(data);
    };

    getFurniture();
  }, []);

  const isAdmin = session.user.role === 'admin';

  const deleteFurniture = async (furniture) => {
    await fetch('/api/images/delete', {
      method: 'delete',
      body: JSON.stringify({ images: furniture.images, folder: 'furnitures' }),
    }).then((res) => res.json());

    await fetch('/api/admin/furniture', {
      method: 'delete',
      body: JSON.stringify(furniture._id),
    }).then((res) => res.json());

    setFurniture((prevFurniture) =>
      prevFurniture.filter((f) => f._id !== furniture._id)
    );
  };

  const updateToSold = async (furnitureId) => {
    await fetch('/api/admin/furniture', {
      method: 'PATCH',
      body: JSON.stringify({ furnitureId, inStock: false }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
  };

  return (
    <AdminLayout>
      <div className="grid grid-cols-3 gap-4">
        {furniture?.length > 0 &&
          furniture.map((furniture) => (
            <FurnitureCard
              key={furniture._id}
              furniture={furniture}
              isAdmin={isAdmin}
              updateToSold={updateToSold}
              deleteFurniture={deleteFurniture}
            />
          ))}
      </div>
    </AdminLayout>
  );
};

MyFurniturePage.auth = true;

export default MyFurniturePage;
