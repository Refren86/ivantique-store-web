import { Home, Layout } from 'components';

const HomePage = ({ sliderContents, categories }) => {
  return (
    <Layout>
      <Home slides={sliderContents} categories={categories} />
    </Layout>
  );
};

export default HomePage;

export async function getStaticProps() {
  return {
    props: [],
  };
}
