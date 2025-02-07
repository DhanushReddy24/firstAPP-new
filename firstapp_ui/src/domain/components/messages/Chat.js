import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import './Chat.css';
import ApiDataIOManager from '../../../common/ApiDataIOManager';

function Chat() {
  const { userId } = useParams();
  const [selectedChat, setSelectedChat] = useState(null);
  const utils = ApiDataIOManager();

  const fetchUserData = async (userId) => {
    try {
      let url = `user/details/${userId}`;
      const response = await utils.fetchData(url);
      let data = await response.data;
      setSelectedChat(data);
      console.log(selectedChat);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchUserData(userId);
  }, [userId]);

  return (
    <div className="chat-container">
      <ChatList
        onSelectChat={(chatId) => setSelectedChat(chatId)}
        userId={userId}
      />
      <ChatWindow selectedChat={selectedChat} />
    </div>
  );
}

export default Chat;
