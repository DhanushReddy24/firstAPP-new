import React from 'react';
import Sidebar from './Sidebar';
import Feed from './Feed';
import Widgets from './Widgets';
import './Tweet.css';

function Tweet() {
  return (
    <div className="Tweet">
      <Sidebar />
      <Feed />
      <Widgets />
    </div>
  );
}

export default Tweet;
