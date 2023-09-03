import React, { useState } from 'react';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import "./Chat.css";

function Chat() {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="chat-container">
      <ChatList onSelectChat={(chatId) => setSelectedChat(chatId)} />
      <ChatWindow selectedChat={selectedChat} />
    </div>
  );
}

export default Chat;
