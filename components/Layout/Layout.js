import { Meta } from 'components/Meta';
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';

export const Layout = ({
  children,
  title,
  keywords,
  description,
  ogTitle,
  ogDescription,
  ogType,
  ogUrl,
  ogImage,
}) => {
  return (
    <>
      <Meta
        title={title}
        keywords={keywords}
        description={description}
        ogTitle={ogTitle}
        ogDescription={ogDescription}
        ogType={ogType}
        ogUrl={ogUrl}
        ogImage={ogImage}
      />

      <div className='flex flex-col min-h-[100vh]'>
        <Header />
        <main className="relative flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
};
