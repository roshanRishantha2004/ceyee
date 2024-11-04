import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BellFilled, MailOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import '../../css/Header.css';

export const Header = () => {
  return (
    <div className="header-container">
      <div className="header-content">
        <h1 className="header-title">
          Sahanodaya Foundation
        </h1>
        <div className="header-icons">
          <Badge count={20}>
            <MailOutlined />
          </Badge>
          <Badge count={10}>
            <BellFilled />
          </Badge>
        </div>
        <button className="logout-button">Log Out</button>
      </div>
    </div>
  );
};
