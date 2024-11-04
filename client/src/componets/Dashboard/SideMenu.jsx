import React from 'react';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

const SideMenu = () => {
  const navigate = useNavigate();

  return (
    <Menu
      onClick={({ key }) => {
        navigate(key);
      }}
      items={[
        {
          label: "Songs",
          key: "/dashboard/song",
        },
        {
          label: 'Artists',
          key: '/dashboard/artist',
        },
      ]}
    />
  );
};

export default SideMenu;
