import { Furnitures, Layout, ReturnLink, Title } from 'components';
import { secrets } from 'utils/constants';

export async function getServerSideProps(context) {
  const { params } = context;

  const { category } = await fetch(
    `${secrets.BASE_URL}/api/category/${params.category}`
  ).then((res) => res.json());

  return {
    props: { furnitures: category.furniture },
  };
}

const Category = ({ furnitures }) => {
  return (
    <Layout>
      {furnitures?.length > 0 ? (
        <Furnitures furnitures={furnitures} />
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
