import { AdminLayout, FurnitureCard } from 'components';
import { useEffect, useState } from 'react';

const MyFurniturePage = () => {
  const [furniture, setFurniture] = useState([]);

  useEffect(() => {
    fetch('/api/admin/furniture')
      .then((res) => res.json())
      .then((data) => setFurniture(data));
  }, []);

  return (
    <AdminLayout>
      <div className="grid grid-cols-3 gap-4">
        {furniture.length > 0 &&
          furniture.map((furniture) => (
            <FurnitureCard key={furniture._id} furniture={furniture} />
          ))}
      </div>
    </AdminLayout>
  );
};

export default MyFurniturePage;
