import { normalizer } from 'helpers';
import { Furnitures, Layout, ReturnLink, Title } from 'components';
import { apolloClient } from 'utils/services';
import { GET_FURNITURE_BY_CATEGORY } from 'utils/queries';

const Category = ({ furnitures }) => {
  console.log(furnitures);

  return (
    <Layout>
      {furnitures.data?.length > 0 ? (
        <Furnitures furnitures={normalizer(furnitures)} />
      ) : (
        <>
          <Title text="На даний момент товари з даної категорії відсутні" />
          <ReturnLink />
        </>
      )}
    </Layout>
  );
};

export default Category;

export async function getServerSideProps({ query }) {
  const { data } = await apolloClient.query({
    query: GET_FURNITURE_BY_CATEGORY,
    variables: query,
  });

  return {
    props: data,
  };
}
