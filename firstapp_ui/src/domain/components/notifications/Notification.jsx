import React, { useState, useEffect, useRef } from 'react';
import ApiDataIOManager from '../../../common/ApiDataIOManager';

function Notification({
  showNotifications,
  changeNotificationsCount,
  onClose,
}) {
  const [notifications, setNotifications] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const utils = ApiDataIOManager();
  const notificationRef = useRef();

  const toggleRefresh = () => {
    setRefresh(!refresh);
  };

  const fetchNotifications = async () => {
    try {
      const url = `connection/notification/`;
      const response = await utils.fetchData(url);
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const markAsRead = async (notificationId) => {
    const url = `connection/notification/`;
    const formData = { id: notificationId, is_read: true };
    await utils.putData(url, formData);
    toggleRefresh();
    changeNotificationsCount();
  };

  useEffect(() => {
    fetchNotifications();
  }, [refresh]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        if (typeof onClose === 'function') {
          onClose();
        }
      }
    };

    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications, onClose]);

  return (
    <div
      ref={notificationRef}
      className={`notification ${showNotifications ? 'block' : 'hidden'}`}
    >
      <div className="notification-popup fixed top-12 right-2 w-72 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50">
        {notifications.map((notification) => (
          <div key={notification.id} className="notification-item mb-4">
            <p className="text-gray-700">{notification.message}</p>
            <button
              className="mark-as-read-button bg-blue-500 text-white rounded-md px-4 py-2 mt-2 hover:bg-blue-700 transition duration-300"
              onClick={() => markAsRead(notification.id)}
            >
              Mark as Read
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notification;
