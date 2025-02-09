import React, { useState, useEffect } from 'react';
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterTweetEmbed,
} from 'react-twitter-embed';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Badge from '@mui/material/Badge';
import Notification from '../notifications/Notification';
import ApiDataIOManager from '../../../common/ApiDataIOManager';
import './Widgets.css';

function Widgets() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(0);
  const utils = ApiDataIOManager();

  const toggleNotification = () => {
    setShowNotifications(!showNotifications);
  };

  const changeNotificationsCount = () => {
    setNotificationsCount(notificationsCount - 1);
  };

  const fetchNotificationsCount = async () => {
    try {
      const url = `connection/notificationcount/`;
      const response = await utils.fetchData(url);
      setNotificationsCount(response.data);
    } catch (error) {
      console.error('Error fetching notification count:', error);
    }
  };

  useEffect(() => {
    fetchNotificationsCount();
  }, []);

  return (
    <div className="widgets">
      <div className="widgets__input flex items-center bg-gray-100 p-2 rounded-full mt-2 ml-5 fixed z-10">
        <Badge
          badgeContent={notificationsCount}
          color="error"
          overlap="circular"
        >
          <NotificationsNoneIcon
            className="text-gray-500 cursor-pointer"
            onClick={toggleNotification}
          />
        </Badge>
        <SearchIcon className="text-gray-500 ml-2" />
        <input
          placeholder="Search Twitter"
          type="text"
          className="border-none bg-gray-100 ml-2 outline-none"
        />
      </div>

      <div className="widgets__widgetContainer relative mt-16 ml-5 p-5 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-bold">What's happening</h2>

        <TwitterTweetEmbed tweetId={'858551177860055040'} />

        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="cleverqazi"
          options={{ height: 400 }}
        />

        <TwitterShareButton
          url={'https://facebook.com/cleverprogrammer'}
          options={{ text: '#reactjs is awesome', via: 'cleverqazi' }}
        />
      </div>
      <Notification
        showNotifications={showNotifications}
        changeNotificationsCount={changeNotificationsCount}
        onClose={() => setShowNotifications(false)}
      />
    </div>
  );
}

export default Widgets;
