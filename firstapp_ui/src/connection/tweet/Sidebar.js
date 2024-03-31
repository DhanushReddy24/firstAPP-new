import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MapIcon from "@mui/icons-material/Map";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Button } from "@mui/material";
import WebhookIcon from '@mui/icons-material/Webhook';


function Sidebar() {
  return (
    <div className="sidebar">
      <WebhookIcon className="sidebar__twitterIcon" />

      <SidebarOption active Icon={HomeIcon} text="Home" />
      <SidebarOption Icon={SearchIcon} text="Explore" to="/Explore"/>
      <SidebarOption Icon={NotificationsNoneIcon} text="Notifications" to="/notification"/>
      <SidebarOption Icon={MailOutlineIcon} text="Messages" to="/chat"/>
      <SidebarOption Icon={MapIcon} text="Maps" to="/maps" />
      <SidebarOption Icon={ListAltIcon} text="Lists" />
      <SidebarOption Icon={PermIdentityIcon} text="Profile" to="/profile"/>
      <SidebarOption Icon={MoreHorizIcon} text="More" />

      {/* Button -> Tweet */}
      <Link to={'/tweetbox'}>
        <Button variant="outlined" className="sidebar__tweet" fullWidth>
          Tweet
        </Button>
      </Link>
    </div>
  );
}

export default Sidebar;
