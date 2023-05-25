import { Furnitures, Layout } from 'components';

const FurnituresPage = ({ furnitures }) => {
  return (
    <Layout>
      <Furnitures furnitures={furnitures} />
    </Layout>
  );
};

export default FurnituresPage;

export async function getServerSideProps() {
  return {
    props: [],
  };
}
