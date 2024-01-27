import React, { useState, useEffect } from "react";
import FetchData from "../../common/FetchData";
import "./ChatList.css";
import axios from 'axios';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';


function ChatList({ onSelectChat }) {
  const chatList1 = [
    { id: 1, first_name: 'Friend 1',lastMessage: '29/08/2023'},
    { id: 2, first_name: 'Friend 2',lastMessage: '27/08/2023'},
    // ... more chat items
  ];
  //const { chatList1, loading } = FetchData("http://127.0.0.1:8000/user/users/");
  const [chatList, setchatList] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [authTokens, setauthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : {"refresh": null, "access": null})
  const [userData, setuserData] = useState(()=> localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : {"id": null})

  const fetchData = async () => {
    try {
      let apiUrl = "http://127.0.0.1:8000/user/users/";

      console.log(apiUrl)
      const response = await axios.get(apiUrl,{
        'headers': { 
          'Content-Type':'application/json',
          'Authorization': 'JWT ' +String(authTokens.access) 
        }
      });
      setchatList(response.data);
      
    } 
    catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  const handleChatClick = (chat) => {
    onSelectChat(chat)
    setActiveChat(chat.id);
  };

  return (
    <div className="chat-list">
      <div className="profile-bar">
        <img src={`http://127.0.0.1:8000${userData.image}`} alt="Profile" className="profile-image" />
        <div className="profile-barRight">
          <DonutLargeIcon fontSize="small"/>
          <ChatIcon fontSize="small"/>
          <MoreVertIcon fontSize="small"/>
        </div>
      </div>

      <div className="search-bar">
        <input type="text" placeholder="Search chats" />
      </div>

      <div className="chat-list-items">
      {chatList.map((chat) => (
        <div
          key={chat.id}
          className={`chat-list-item ${chat.id=== activeChat ? "active" : ""}`}
          onClick={() => handleChatClick(chat)}
        >
          <img src={`http://127.0.0.1:8000${chat.image}`} alt="Profile" className="profile-image" />
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
