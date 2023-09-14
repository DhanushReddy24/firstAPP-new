import React, { useState, useEffect, useRef } from "react";
import "./ChatWindow.css";
import axios from 'axios';
import InputBox from "./InputBox";
import SearchIcon from '@material-ui/icons/Search';
import MoreVertIcon from '@material-ui/icons/MoreVert';


function ChatWindow({ selectedChat }) {
  const chatMessages1 = [
    { id: 1, text: 'Hi',time: '29/08/2023', sender:'me'},
    { id: 2, text: 'Hello',time: '27/08/2023',sender:'him'},
  ];

  const [authTokens, setauthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : {"refresh": null, "access": null})
  const [userData, setuserData] = useState(()=> localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : {"id": null})
  const [chatMessages, setchatMessages] = useState([])
  const [Refresh, setRefresh] = useState(true)
  let prevDate = null;

  const formatDateTime = (datetime)=>{
    const date = new Date(datetime);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return {date:formattedDate, time:formattedTime}
  }

  const toggleRefresh = () => {
    setRefresh(!Refresh)
    console.log(Refresh)
  };

  const fetchData = async () => {
    try {
      if (selectedChat) {
        let apiUrl = `http://127.0.0.1:8000/connection/message/${selectedChat.id}`;

        console.log(apiUrl)
        const response = await axios.get(apiUrl,{
          'headers': { 
            'Content-Type':'application/json',
            'Authorization': 'JWT ' +String(authTokens.access) 
          }
        });
        setchatMessages(response.data);
      }
    } 
    catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedChat,Refresh]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        {!selectedChat &&  ('Select a chat')}
        {selectedChat &&  ( 
          <div className="window-profile-bar">
            <div className="window-profile-barLeft">
              <img src={`http://127.0.0.1:8000${selectedChat.image}`} alt="Profile" className="profile-image" />
              <p>{selectedChat.first_name} </p>
            </div>
            <div className="window-profile-barRight">
              <SearchIcon fontSize="small"/>
              <MoreVertIcon fontSize="small"/>
            </div>
          </div>
        )}
      </div>
      <div className="messages">
        {selectedChat && (
          chatMessages.map((message) => {
            const showMessageDate = formatDateTime(message.created_at).date !== prevDate;
            prevDate = formatDateTime(message.created_at).date;

            return (
              <div key={message.id} className="day-messages">
                {showMessageDate && (
                  <span className="message-date">{formatDateTime(message.created_at).date}</span>
                )}
                {console.log(message.message,message.user,userData.id)}
                <div key={message.id} className={`message ${message.user === userData.id ? "sent" : "received"}`}>
                  <p>{message.message}</p>
                  <span className="message-time">{formatDateTime(message.created_at).time}</span>
                </div>
              </div>
            )
          })
        )}
      </div>
      {selectedChat && (
        <InputBox selectedChat={selectedChat} toggleRefresh={toggleRefresh} />
      )}
    </div>
  );
}

export default ChatWindow;
