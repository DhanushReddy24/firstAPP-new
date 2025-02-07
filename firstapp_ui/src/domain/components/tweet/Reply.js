import React, { useState, useEffect } from 'react';
import ReplyBox from './ReplyBox';
import ApiDataIOManager from '../../../common/ApiDataIOManager';
import './Reply.css';

function Reply({ tweetId, showReplies, updateCommentCount }) {
  const [replies, setReplies] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const utils = ApiDataIOManager();

  const toggleRefresh = () => {
    setRefresh((prev) => !prev);
  };

  const fetchReplies = async () => {
    try {
      const response = await utils.fetchData(`connection/reply/${tweetId}/`);
      setReplies(response.data);
      updateCommentCount(response.data.length);
    } catch (error) {
      console.error('Error fetching replies:', error);
    }
  };

  useEffect(() => {
    fetchReplies();
  }, [refresh]);

  return (
    <div className="tweet-replies">
      {showReplies && (
        <span>
          <ul className="replies-list">
            {replies.map((reply) => (
              <li key={reply.id} className="reply-item">
                <p className="reply-content">
                  <span className="reply-author">@{reply.username} </span>
                  <span className="reply-date">{reply.created_at} </span>
                  <br />
                  <span className="reply-text">{reply.reply} </span>
                </p>
              </li>
            ))}
          </ul>
          <ReplyBox tweetId={tweetId} toggleRefresh={toggleRefresh} />
        </span>
      )}
    </div>
  );
}

export default Reply;
