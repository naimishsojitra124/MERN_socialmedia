import React from 'react';
import { Helmet } from 'react-helmet';
import { Feed, HomeUserSuggestions } from '../../components/index';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>SnapThread</title>
      </Helmet>
      <div className='Home'>
        <Feed />
        <HomeUserSuggestions />
      </div>
    </>
  );
};

export default Home;
