import React from 'react';
import Sidebar from './AppNav/Sidebar';
import './MainLayout.css';

function MainLayout({ children }) {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">{children}</div>
    </div>
  );
}

export default MainLayout;
