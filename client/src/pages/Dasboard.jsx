import React from 'react';
import {Header} from '../componets/Dashboard/Header';
import SideMenu from '../componets/Dashboard/SideMenu';
import Footer from '../componets/Dashboard/Footer';
import PageContent from '../componets/Dashboard/PageContent';
import '../css/Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Header />
      <div className="dashboard-main">
        <SideMenu className="dashboard-side-menu" />
        <div className="dashboard-content">
          <PageContent />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
