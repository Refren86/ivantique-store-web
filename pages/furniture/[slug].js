import { FurnitureDetails, Layout, Title } from 'components';

const FurnitureBySlug = ({ furnitures }) => {
  if (furnitures?.length === 0) return <Title text="Даний товар відсутній" />;

  return (
    <Layout>
      <FurnitureDetails furnitures={furnitures} />
    </Layout>
  );
};

export default FurnitureBySlug;

export async function getServerSideProps({ query }) {
  return {
    props: [],
  };
}
