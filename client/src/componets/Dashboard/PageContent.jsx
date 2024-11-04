import React from 'react';
import { Outlet } from 'react-router-dom';

const PageContent = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default PageContent;
