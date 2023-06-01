import { FurnitureDetails, Layout, Title } from 'components';
import { secrets } from 'utils/constants';

export async function getServerSideProps(context) {
  const { params } = context;

  const { furniture } = await fetch(
    `${secrets.BASE_URL}/api/furniture/${params.id}`
  ).then((res) => res.json());

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
