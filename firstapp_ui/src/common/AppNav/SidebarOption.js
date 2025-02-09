import React from 'react';
import { Link } from 'react-router-dom';
import './SidebarOption.css';

function SidebarOption({ active, text, Icon, to, isOpen }) {
  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
  };

  return (
    <Link to={to} style={linkStyle}>
      <div className={`sidebarOption ${active && isOpen ? 'sidebarOption--active' : ''} ${!isOpen ? 'sidebarOption--closed' : ''}`}>
        <Icon className="sidebarOption__icon" />
        {isOpen && <h2 className="sidebarOption__text">{text}</h2>}
      </div>
    </Link>
  );
}

export default SidebarOption;