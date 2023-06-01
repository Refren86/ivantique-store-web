import { Home, Layout } from 'components';
import { secrets } from 'utils/constants';

export async function getStaticProps() {
  const getSlides = fetch(secrets.BASE_URL + '/api/admin/slides').then((res) =>
    res.json()
  );

  const getCategories = fetch(secrets.BASE_URL + '/api/admin/categories').then(
    (res) => res.json()
  );

  const [{ slides }, { categories }] = await Promise.all([
    getSlides,
    getCategories,
  ]);

  return {
    props: {
      slides,
      categories,
    },
    revalidate: 60,
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
