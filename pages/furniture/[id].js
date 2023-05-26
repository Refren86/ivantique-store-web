import { FurnitureDetails, Layout, Title } from 'components';

export async function getServerSideProps(context) {
  const { params } = context;

  const { furniture } = await fetch(
    `http://localhost:3000/api/furniture/${params.id}`
  ).then((res) => res.json());

  console.log(`furniture >>>`, furniture);

  return {
    props: {
      furniture,
    },
  };
}

const FurnitureBySlug = ({ furniture }) => {
  if (!furniture) return <Title text="Даний товар відсутній" />;

  return (
    <Layout>
      <FurnitureDetails furniture={furniture} />
    </Layout>
  );
};

export default FurnitureBySlug;
