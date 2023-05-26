import { Home, Layout } from 'components';

export async function getServerSideProps() {
  const getSlides = fetch('http://localhost:3000/api/admin/get-slides').then(
    (res) => res.json()
  );

  const getCategories = fetch(
    'http://localhost:3000/api/admin/get-categories'
  ).then((res) => res.json());

  const [{ slides }, { categories }] = await Promise.all([
    getSlides,
    getCategories,
  ]);

  return {
    props: {
      slides,
      categories,
    },
  };
}

const HomePage = ({ slides, categories }) => {
  return (
    <Layout>
      <Home slides={slides} categories={categories} />
    </Layout>
  );
};

export default HomePage;
