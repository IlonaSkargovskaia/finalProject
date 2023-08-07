import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(segment => segment !== '');

  let currentLink = '';

  const breadcrumbs = segments.map((segment, index) => {
    currentLink += `/${segment}`;

    return (
      <div className='crumb' key={index}>
        <Link to={currentLink}>{segment}</Link>
      </div>
    );
  });

  // Home link at the beginning of the breadcrumbs
  breadcrumbs.unshift(
    <div className='crumb' key='home'>
      <Link to='/'>Home</Link>
    </div>
  );

  return <div className='breadcrumbs'>{breadcrumbs}</div>;
};

export default Breadcrumbs;
