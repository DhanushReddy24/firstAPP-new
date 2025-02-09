import React from 'react';
import Feed from './Feed';
import Widgets from './Widgets';
import './Tweet.css';

function Tweet() {
  return (
    <div className="Tweet">
      <Feed />
      <Widgets />
    </div>
  );
}

export default Tweet;
