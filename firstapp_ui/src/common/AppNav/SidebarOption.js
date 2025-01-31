import React from 'react';
import { Link } from 'react-router-dom';
import './SidebarOption.css';

function SidebarOption({ active, text, Icon, to }) {
  const linkStyle = {
    textDecoration: 'none', // Remove underline
    color: 'inherit', // Inherit color from parent
  };

  return (
    <Link to={to} style={linkStyle}>
      <div className={`sidebarOption ${active && 'sidebarOption--active'}`}>
        <Icon />
        <h2>{text}</h2>
      </div>
    </Link>
  );
}

export default SidebarOption;
