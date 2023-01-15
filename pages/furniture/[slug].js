import { normalizer } from 'helpers';
import { FurnitureDetails, Layout, Title } from 'components';
import { apolloClient } from 'utils/services';
import { GET_FURNITURE_BY_SLUG } from 'utils/queries';

const FurnitureBySlug = ({ furnitures }) => {
  if (furnitures?.length === 0) return <Title text="Даний товар відсутній" />;

  return (
    <Layout>
      <FurnitureDetails furnitures={normalizer(furnitures)} />
    </Layout>
  );
};

export default FurnitureBySlug;

export async function getServerSideProps({ query }) {
  const { data } = await apolloClient.query({
    query: GET_FURNITURE_BY_SLUG,
    variables: query,
  });

  return {
    props: data,
  };
}
