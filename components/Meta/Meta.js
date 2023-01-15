import Head from 'next/head';

import { secrets } from 'utils/constants';

const metaTitle = 'Ivantique - Антикварні меблі з Європи';
const metaKeywords =
  'Ivantique, меблі, антикваріат, антиквар, антикварні меблі, антикварні меблі з Європи, меблі антикварні, меблі з Європи, столи, шафи, комоди, креденси, вітрини, тарілочники, тумбочки, крісла, ліжка, дзеркала, старовинні меблі, дешеві меблі, дешеві антикварні меблі, антикварні меблі Україна, антикварні меблі в Україні';
const metaDescription = 'Продаж антикварних меблів в Україні. Якісний та цікавий асортимент. Антикварні меблі зі всієї Європи. Доставка по Україні.'
const baseUrl = secrets.BASE_URL;
const ogMetaType = 'website';
const ogMetaImage =
  'https://res.cloudinary.com/dpsjjcwx7/image/upload/v1671838320/image_2_b1081e9e40.jpg';

export const Meta = ({
  title,
  keywords = metaKeywords,
  description = metaDescription,
  ogTitle = metaTitle,
  ogDescription = metaDescription,
  ogType = ogMetaType,
  ogUrl = baseUrl,
  ogImage = ogMetaImage,
}) => {
  return (
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:image" content={ogImage} />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.png" />
      <title>{title ? title + ' - Ivantique' : metaTitle}</title>
    </Head>
  );
};
