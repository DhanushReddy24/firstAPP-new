import React, { useState, useEffect } from "react";
import "./Widgets.css";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterTweetEmbed,
} from "react-twitter-embed";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Badge from '@mui/material/Badge';
import Notification from "./Notification";
import  ApiDataIOManager from '../../common/ApiDataIOManager';

function Widgets() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [NotificationsCount, setNotificationsCount] = useState(false);
  const utils = ApiDataIOManager();

  const toggleNotification = () => {
    setShowNotifications(!showNotifications)
  };

  const changeNotificationsCount = () => {
    setNotificationsCount(NotificationsCount-1)
  };

  const fetchNotificationsCount= async () => {
    try {
      let url = `connection/notificationcount/`;
      const response = await utils.fetchData(url);
      setNotificationsCount(response.data);
    } catch (error) {
      console.error("Error fetching notificationcount:", error);
    }
  };

  useEffect(() => {
    fetchNotificationsCount();
  }, []);

  return (
    <div className="widgets">
      <div className="widgets__input">
      <Badge badgeContent={NotificationsCount} color="error" overlap="circular">
        <NotificationsNoneIcon className="widgets__notiIcon" onClick={toggleNotification}/>
      </Badge>
        <SearchIcon className="widgets__searchIcon" />
        <input placeholder="Search Twitter" type="text" />
      </div>

      <div className="widgets__widgetContainer">
        <h2>What's happening</h2>

        <TwitterTweetEmbed tweetId={"858551177860055040"} />

        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="cleverqazi"
          options={{ height: 400 }}
        />

        <TwitterShareButton
          url={"https://facebook.com/cleverprogrammer"}
          options={{ text: "#reactjs is awesome", via: "cleverqazi" }}
        />
      </div>
      <Notification showNotifications={showNotifications} changeNotificationsCount={() => changeNotificationsCount()}/>
    </div>
    
  );
}

export default Widgets;
