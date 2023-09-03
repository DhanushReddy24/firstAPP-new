import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Reply.css";

function Reply({ tweetId, showReplies }) {
  const [replies, setReplies] = useState([]);
  const [authTokens, setauthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : {"refresh": null, "access": null})

  const fetchReplies = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/connection/reply/${tweetId}/`,{
        'headers': { 
          'Content-Type':'application/json',
          'Authorization': 'JWT ' +String(authTokens.access) 
        }
      });
      setReplies(response.data);
    } catch (error) {
      console.error("Error fetching replies:", error);
    }
  };

  useEffect(() => {
    fetchReplies();
  }, [tweetId]);

  return (
    <span>
    {showReplies && (
      <div className="tweet-replies">
        <h2 className="replies-heading">Replies:</h2>
        <ul className="replies-list">
          {replies.map((reply) => (
            <li key={reply.id} className="reply-item">
              <p className="reply-content">
                <span className="reply-author">@{reply.username} </span> 
                <span className="reply-date">{reply.created_at} </span><br/>
                <span className="reply-text">{reply.reply} </span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    )};
    </span>
  );
}

export default Reply;
