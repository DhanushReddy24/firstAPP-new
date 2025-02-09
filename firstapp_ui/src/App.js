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
import MainLayout from './common/MainLayout';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/sample_1"
          element={
            <MainLayout>
              <Sample_1 />
            </MainLayout>
          }
        />
        <Route
          path="/sample_1/:pk"
          element={
            <MainLayout>
              <Sample_1 />
            </MainLayout>
          }
        />
        <Route
          path="/sample_1_post"
          element={
            <MainLayout>
              <Sample_1_Post />
            </MainLayout>
          }
        />
        <Route
          path="/tweet"
          element={
            <MainLayout>
              <Tweet />
            </MainLayout>
          }
        />
        <Route
          path="/reply"
          element={
            <MainLayout>
              <Reply tweetId={1} showReplies={true} />
            </MainLayout>
          }
        />
        <Route
          path="/chat/:userId?"
          element={
            <MainLayout>
              <Chat />
            </MainLayout>
          }
        />
        <Route
          path="/chat"
          element={
            <MainLayout>
              <Chat />
            </MainLayout>
          }
        />
        <Route
          path="/inputbox"
          element={
            <MainLayout>
              <InputBox selectedChat={6} />
            </MainLayout>
          }
        />
        <Route
          path="/tweetbox"
          element={
            <MainLayout>
              <TweetBox />
            </MainLayout>
          }
        />
        <Route
          path="/replybox"
          element={
            <MainLayout>
              <ReplyBox />
            </MainLayout>
          }
        />
        <Route
          path="/maps"
          element={
            <MainLayout>
              <Maps />
            </MainLayout>
          }
        />
        <Route
          path="/jobs"
          element={
            <MainLayout>
              <Jobs />
            </MainLayout>
          }
        />
        <Route
          path="/jobs/job-listing-form"
          element={
            <MainLayout>
              <JobListingForm />
            </MainLayout>
          }
        />
        <Route
          path="/explore"
          element={
            <MainLayout>
              <Explore />
            </MainLayout>
          }
        />
        <Route
          path="/profile/:userId?"
          element={
            <MainLayout>
              <ProfilePage />
            </MainLayout>
          }
        />
        <Route
          path="/notification"
          element={
            <MainLayout>
              <Notification showNotifications={true} />
            </MainLayout>
          }
        />
        <Route
          path="/main"
          element={
            <MainLayout>
              <Main />
            </MainLayout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
