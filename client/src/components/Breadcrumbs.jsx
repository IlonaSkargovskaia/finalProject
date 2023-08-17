import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  // Get the current location from the router
  const location = useLocation();
  // Split the pathname into segments and remove empty segments
  const segments = location.pathname.split('/').filter(segment => segment !== '');

  // If there are no segments, no breadcrumbs are needed
  if (segments.length === 0) {
    return null;
  }

  let currentLink = '';

   // Generate breadcrumb links for each segment
  const breadcrumbs = segments.map((segment, index) => {
    currentLink += `/${segment}`;

    // Create a breadcrumb item with a link
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
