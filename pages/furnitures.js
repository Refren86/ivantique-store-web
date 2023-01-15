import { normalizer } from 'helpers';
import { Furnitures, Layout } from 'components';
import { apolloClient } from 'utils/services';
import { GET_ALL_FURNITURE } from 'utils/queries';

const FurnituresPage = ({ furnitures }) => {
  return (
    <Layout>
      <Furnitures furnitures={normalizer(furnitures)} />
    </Layout>
  );
};

export default FurnituresPage;

export async function getServerSideProps() {
  const { data } = await apolloClient.query({
    query: GET_ALL_FURNITURE,
  });

  return {
    props: data,
  };
}
