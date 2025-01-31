import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sample_1 from './sample/Sample_1';
import Sample_1_Post from './sample/Sample_1_Post';
import Welcome from './authentication/Welcome';
import Login from './authentication/Login';
import Register from './authentication/Register';
import Tweet from './connection/tweet/Tweet';
import Reply from './connection/tweet/Reply';
import Chat from './connection/message/Chat';
import InputBox from './connection/message/InputBox';
import TweetBox from './connection/tweet/TweetBox';
import ReplyBox from './connection/tweet/ReplyBox';
import Explore from './connection/tweet/Explore';
import Profile from './connection/tweet/Profile';
import Notification from './connection/tweet/Notification';
import Maps from './connection/tweet/Maps';
import Main from './test/Main';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sample_1" element={<Sample_1 />} />
        <Route path="/sample_1/:pk" element={<Sample_1 />} />
        <Route path="/sample_1_post" element={<Sample_1_Post />} />
        <Route path="/tweet" element={<Tweet />} />
        <Route
          path="/reply"
          element={<Reply tweetId={1} showReplies={true} />}
        />
        <Route path="/chat" element={<Chat />} />
        <Route path="/inputbox" element={<InputBox selectedChat={6} />} />
        <Route path="/tweetbox" element={<TweetBox />} />
        <Route path="/replybox" element={<ReplyBox />} />
        <Route path="/maps" element={<Maps />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/notification"
          element={<Notification showNotifications={true} />}
        />
        <Route path="/main" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
