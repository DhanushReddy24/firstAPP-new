import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sample_1 from './sample/Sample_1';
import Sample_1_Post from './sample/Sample_1_Post';
import Welcome from './authentication/Welcome';
import Login from './authentication/Login';
import Register from './authentication/Register';
import Tweet from './domain/components/tweet/Tweet';
import Reply from './domain/components/tweet/Reply';
import Chat from './domain/components/messages/Chat';
import InputBox from './domain/components/messages/InputBox';
import TweetBox from './domain/components/tweet/TweetBox';
import ReplyBox from './domain/components/tweet/ReplyBox';
import Explore from './domain/components/explore/Explore';
import ProfilePage from './domain/components/profile/Profile';
import Notification from './domain/components/notifications/Notification';
import Maps from './domain/components/maps/Maps';
import Main from './test/Main';
import Jobs from './domain/components/jobs/Jobs';
import JobListingForm from './domain/components/jobs/JobListing';
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
        <Route path='/jobs' element={<Jobs />} />
        <Route path='/jobs/job-listing-form' element={<JobListingForm />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/profile" element={<ProfilePage />} />
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
