import Head from 'next/head';
import Nav from './nav';
import React from 'react';
import { GlobalContext } from './globalContext';
import PropTypes from 'prop-types';

const layoutStyle = {
  margin: 20,
  padding: 20
};

const globalContext = { userLogged: 'lbartroli' };

const Layout = ({ children, title = 'Home' }) => (
  <div style={layoutStyle}>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
        href="https://fonts.googleapis.com/css?family=Roboto"
        rel="stylesheet"
      />
    </Head>
    <GlobalContext.Provider value={globalContext}>
      <header>
        <Nav />
      </header>
      {children}
    </GlobalContext.Provider>
    <style jsx global>{`
      * {
        font-family: 'Roboto';
      }
    `}</style>
  </div>
);

Layout.propTypes = {
  children: PropTypes.object,
  title: PropTypes.string
};

export default Layout;
