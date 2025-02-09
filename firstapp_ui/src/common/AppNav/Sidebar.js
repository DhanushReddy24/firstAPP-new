import React, { useState } from 'react';
import './Sidebar.css';
import { Link, useLocation } from 'react-router-dom';
import SidebarOption from './SidebarOption';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import MapIcon from '@mui/icons-material/Map';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, IconButton } from '@mui/material';
import WebhookIcon from '@mui/icons-material/Webhook';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'sidebar--open' : 'sidebar--closed'}`}>
      <div className="sidebar__top">
        <IconButton onClick={toggleSidebar} className="sidebar__menuButton">
          <MenuIcon />
        </IconButton>
        <WebhookIcon className="sidebar__twitterIcon" />
      </div>

      <SidebarOption
        active={location.pathname === '/tweet'}
        Icon={HomeIcon}
        text="Home"
        to="/tweet"
        isOpen={isOpen}
      />
      <SidebarOption
        active={location.pathname === '/explore'}
        Icon={SearchIcon}
        text="Explore"
        to="/explore"
        isOpen={isOpen}
      />
      <SidebarOption
        active={location.pathname === '/notification'}
        Icon={NotificationsNoneIcon}
        text="Notifications"
        to="/notification"
        isOpen={isOpen}
      />
      <SidebarOption
        active={location.pathname === '/chat'}
        Icon={MailOutlineIcon}
        text="Messages"
        to="/chat"
        isOpen={isOpen}
      />
      <SidebarOption
        active={location.pathname === '/maps'}
        Icon={MapIcon}
        text="Maps"
        to="/maps"
        isOpen={isOpen}
      />
      <SidebarOption
        active={location.pathname === '/jobs'}
        Icon={ListAltIcon}
        text="Jobs"
        to="/jobs"
        isOpen={isOpen}
      />
      <SidebarOption
        active={location.pathname === '/profile'}
        Icon={PermIdentityIcon}
        text="Profile"
        to="/profile"
        isOpen={isOpen}
      />
      <SidebarOption
        active={location.pathname === '/more'}
        Icon={MoreHorizIcon}
        text="More"
        to="/more"
        isOpen={isOpen}
      />

      <Link to={'/tweetbox'}>
        <Button variant="outlined" className="sidebar__tweet" fullWidth>
          Tweet
        </Button>
      </Link>
    </div>
  );
}

export default Sidebar;
