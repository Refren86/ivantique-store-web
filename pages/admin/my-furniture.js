import { useSession } from 'next-auth/react';
import { AdminLayout, FurnitureCard } from 'components';

export const getStaticProps = async () => {
  const furniture = await fetch(
    'http://localhost:3000/api/admin/furniture'
  ).then((res) => res.json());

  return {
    props: {
      furniture,
    },
    revalidate: 60
  };
};

const MyFurniturePage = ({ furniture }) => {
  const { data: session } = useSession();

  const isAdmin = session.user.role === 'admin';

  return (
    <AdminLayout>
      <div className="grid grid-cols-3 gap-4">
        {furniture.length > 0 &&
          furniture.map((furniture) => (
            <FurnitureCard
              key={furniture._id}
              furniture={furniture}
              isAdmin={isAdmin}
            />
          ))}
      </div>
    </AdminLayout>
  );
};

MyFurniturePage.auth = true;

export default MyFurniturePage;
