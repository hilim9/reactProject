import Header from '../../outlines/admin/header';
import Footer from '../../outlines/admin/footer';
import { Outlet } from 'react-router-dom';

const CommonLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default CommonLayout;
