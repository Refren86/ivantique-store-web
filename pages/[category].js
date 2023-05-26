import { Furnitures, Layout, ReturnLink, Title } from 'components';

export async function getServerSideProps(context) {
  const { params } = context;

  const { category } = await fetch(
    `http://localhost:3000/api/category/${params.category}`
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
