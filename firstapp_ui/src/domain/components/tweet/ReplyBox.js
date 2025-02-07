import React, { useState } from 'react';
import ApiDataIOManager from '../../../common/ApiDataIOManager';
import SendIcon from '@mui/icons-material/Send';

function ReplyBox({ tweetId, toggleRefresh }) {
  const [userData] = useState(() =>
    localStorage.getItem('userData')
      ? JSON.parse(localStorage.getItem('userData'))
      : { id: null }
  );

  const [reply, setReply] = useState('');
  const utils = ApiDataIOManager();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!reply.trim()) return; // Prevent empty replies

    try {
      const url = `connection/reply/${tweetId}/`;
      await utils.postData(url, { user: userData.id, tweet: tweetId, reply });
      toggleRefresh();
      setReply('');
    } catch (error) {
      console.error('Error while posting reply:', error);
    }
  };

  return (
    <div className="p-2 flex items-center relative">
      <input
        type="text"
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        placeholder="Comment..."
        className="w-full bg-gray-100 text-sm px-4 py-2 rounded-full pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        onClick={handleSubmit}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-1 transition"
      >
        <SendIcon fontSize="small" className="text-white" />
      </button>
    </div>
  );
}

export default ReplyBox;
