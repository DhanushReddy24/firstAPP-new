import React, { useState, useEffect } from 'react';
import ApiDataIOManager from '../../../common/ApiDataIOManager';
import './Notification.css';

function Notification({ showNotifications, changeNotificationsCount }) {
  const [notifications, setNotifications] = useState([]);
  const [Refresh, setRefresh] = useState(true);
  const utils = ApiDataIOManager();

  const toggleRefresh = () => {
    setRefresh(!Refresh);
  };

  const fetchNotifications = async () => {
    try {
      let url = `connection/notification/`;
      const response = await utils.fetchData(url);
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const markAsRead = async (notificationId) => {
    let url = `connection/notification/`;
    let formData = { id: notificationId, is_read: true };
    let response = await utils.putData(url, formData);
    console.log(response.status);
    toggleRefresh();
    changeNotificationsCount();
  };

  useEffect(() => {
    fetchNotifications();
  }, [Refresh]);

  return (
    <div className="notification">
      {showNotifications && (
        <div className="notification-popup">
          {notifications.map((notification) => (
            <div key={notification.id} className="notification-item">
              <p>{notification.message}</p>
              <button
                className="mark-as-read-button"
                onClick={() => markAsRead(notification.id)}
              >
                Mark as Read
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Notification;
