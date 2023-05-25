import { Furnitures, Layout, ReturnLink, Title } from 'components';

const Category = ({ furnitures }) => {
  return (
    <Layout>
      {furnitures.data?.length > 0 ? (
        <Furnitures furnitures={[]} />
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
  return {
    props: { furnitures: [] },
  };
}
