import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Router from '../../routers/Router'

const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <Router />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
