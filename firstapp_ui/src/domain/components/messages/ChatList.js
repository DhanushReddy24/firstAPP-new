import React, { useState, useEffect } from 'react';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ApiDataIOManager from '../../../common/ApiDataIOManager';
import './ChatList.css';

function ChatList({ onSelectChat }) {
  const chatList1 = [
    { id: 1, first_name: 'Friend 1', lastMessage: '29/08/2023' },
    { id: 2, first_name: 'Friend 2', lastMessage: '27/08/2023' },
    // ... more chat items
  ];
  //const { chatList1, loading } = FetchData(`${apiDomain}/user/users/");
  const [chatList, setchatList] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [userData, setuserData] = useState(() =>
    localStorage.getItem('userData')
      ? JSON.parse(localStorage.getItem('userData'))
      : { id: null }
  );
  const apiDomain = process.env.REACT_APP_DJANGO_DOMAIN_NAME;
  const utils = ApiDataIOManager();

  const fetchData = async () => {
    try {
      let url = `user/users/`;
      const response = await utils.fetchData(url);
      setchatList(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChatClick = (chat) => {
    onSelectChat(chat);
    setActiveChat(chat.id);
  };

  return (
    <div className="chat-list">
      <div className="profile-bar">
        <img
          src={`${userData.image}`}
          alt="Profile"
          className="profile-image"
        />
        <div className="profile-barRight">
          <DonutLargeIcon fontSize="small" />
          <ChatIcon fontSize="small" />
          <MoreVertIcon fontSize="small" />
        </div>
      </div>

      <div className="search-bar">
        <input type="text" placeholder="Search chats" />
      </div>

      <div className="chat-list-items">
        {chatList.map((chat) => (
          <div
            key={chat.id}
            className={`chat-list-item ${chat.id === activeChat ? 'active' : ''}`}
            onClick={() => handleChatClick(chat)}
          >
            <img
              src={`${chat.image}`}
              alt="Profile"
              className="profile-image"
            />
            <div className="chat-info">
              <h4>{chat.first_name}</h4>
              <p>{chat.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatList;
