import React, { useState, useEffect } from "react";
import "./Reply.css";
import ReplyBox from "./ReplyBox";
import  ApiDataIOManager from '../../common/ApiDataIOManager';

function Reply({ tweetId, showReplies }) {
  const [replies, setReplies] = useState([]);
  const [Refresh, setRefresh] = useState(true)
  const utils = ApiDataIOManager();

  const toggleRefresh = (tweetId) => {
    setRefresh(!Refresh)
  };

  const fetchReplies = async () => {
    try {
      let url = `connection/reply/${tweetId}/`;
      const response = await utils.fetchData(url);
      setReplies(response.data);
    } catch (error) {
      console.error("Error fetching replies:", error);
    }
  };

  useEffect(() => {
    fetchReplies();
  }, [Refresh]);

  return (
    <div className="tweet-replies">
    {showReplies && (
      <span>
        <h2 className="replies-heading">Replies:</h2>
        <ReplyBox tweetId={tweetId } toggleRefresh={toggleRefresh}/>
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
      </span>
    )}
    </div>
  );
}

export default Reply;
