import { Home, Layout } from 'components';
import { normalizer } from 'helpers';
import { apolloClient } from 'utils/services';
import { GET_SLIDES_AND_CATEGORIES } from 'utils/queries';

const HomePage = ({ sliderContents, categories }) => {
  return (
    <Layout>
      <Home
        slides={normalizer(sliderContents)}
        categories={normalizer(categories)}
      />
    </Layout>
  );
};

export default HomePage;

export async function getStaticProps(context) {
  try {
    const { data } = await apolloClient.query({
      query: GET_SLIDES_AND_CATEGORIES,
    });

    return {
      props: data,
    };
  } catch (err) {
    console.log('Error >>>', err);

    return {
      props: {},
    };
  }
}
