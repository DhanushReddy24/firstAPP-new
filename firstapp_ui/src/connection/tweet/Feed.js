import React, { useState, useEffect } from 'react';
import Post from './Post';
import Reply from './Reply';
import FlipMove from 'react-flip-move';
import ApiDataIOManager from '../../common/ApiDataIOManager';
import './Feed.css';

function Feed() {
  const [posts, setPosts] = useState([]);
  const [userData, setuserData] = useState(() =>
    localStorage.getItem('userData')
      ? JSON.parse(localStorage.getItem('userData'))
      : { id: null }
  );
  const [showReplies, setShowReplies] = useState({});
  const [showLikes, setShowLikes] = useState({});
  const [showLikeCount, setShowLikeCount] = useState({});
  const [imageOrientation, setImageOrientation] = useState({});
  const utils = ApiDataIOManager();

  const getImageOrientation = (imageUrl) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        if (img.width > img.height) {
          resolve("landscape");
        } else {
          resolve("portrait");
        }
      };
      img.onerror = (err) => reject(err);
      img.src = imageUrl;
    });
  };

  const toggleReplies = (tweetId) => {
    setShowReplies((prevState) => ({
      ...prevState,
      [tweetId]: !prevState[tweetId],
    }));
  };

  const deleteTweet = async (tweetId) => {
    let url = `connection/tweetdelete/${tweetId}/`;
    let response = await utils.postData(url);
    console.log(response.status);
  };

  const toggleLikes = async (tweetId, tweetuserId, like) => {
    let updatedFormData = {
      user: userData.id,
      tweet: tweetId,
    };
    let notiFormData = {
      user: tweetuserId,
      from_user: userData.id,
      tweet: tweetId,
      notification_type: 'TL',
    };

  };

  const fetchData = async () => {
    try {
      let url = `connection/tweet/`;
      const response = await utils.fetchData(url);
      setPosts(response.data);
      
      response.data.forEach((post) => {
        if (post.image) {
          getImageOrientation(post.image).then((orientation) => {
            setImageOrientation((prevState) => ({
              ...prevState,
              [post.id]: orientation,
            }));
          }).catch((err) => console.error("Error loading image:", err));
        }
      });

      // Fetch like data
      url = `connection/tweetlike/`;
      const like_response = await utils.fetchData(url);
      setShowLikes(like_response.data);

      // Fetch like count data
      url = `connection/tweetlikecount/`;
      const likecount_response = await utils.fetchData(url);
      setShowLikeCount(likecount_response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>

      <FlipMove>
        {posts.map((post) => (
          <div key={post.id} className="post-wrapper">
            <Post
              key={post.id}
              id={post.id}
              displayName={post.firstname}
              username={post.username}
              userimage={post.userimage}
              verified={post.verified}
              text={post.tweet}
              postimage={post.image}
              avatar="avatar"
              toggleReplies={() => toggleReplies(post.id)}
              isLike={showLikes[post.id] ? showLikes[post.id][0] : null}
              isdisLike={showLikes[post.id] ? showLikes[post.id][1] : null}
              toggleLikes={(like) => toggleLikes(post.id, post.user, like)}
              likecount={showLikeCount[post.id] ? showLikeCount[post.id] : null}
              deleteTweet={deleteTweet}
              imageOrientation={imageOrientation[post.id]}
            />
            <Reply tweetId={post.id} showReplies={showReplies[post.id]} />
          </div>
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;
