import React, { useState, useEffect } from "react";
import Post from "./Post";
import Reply from "./Reply";
import "./Feed.css";
import FlipMove from "react-flip-move";
import  ApiDataIOManager from '../../common/ApiDataIOManager';

function Feed() {
  const [posts, setPosts] = useState([]);
  const [userData, setuserData] = useState(()=> localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : {"id": null})
  const [showReplies, setShowReplies] = useState({});
  const [showLikes, setShowLikes] = useState({});
  const [showLikeCount, setShowLikeCount] = useState({});
  const utils = ApiDataIOManager();

  const toggleReplies = (tweetId) => {
    setShowReplies((prevState) => ({
      ...prevState,
      [tweetId]: !prevState[tweetId],
    }));
  };

  const toggleLikes = async(tweetId, like) => {

    let updatedFormData = {
      'user': userData.id,
      'tweet': tweetId,
    };
    if (like===true) {
      console.log('like')
      setShowLikes((prevState) => ({
        ...prevState,
        [tweetId]: [!prevState[tweetId] ? true : !prevState[tweetId][0],prevState[tweetId] ? prevState[tweetId][0] ? prevState[tweetId][1] : false : false],
      }));
      setShowLikeCount((prevState) => ({
        ...prevState,
        [tweetId]: !showLikeCount[tweetId] ? 1 : !showLikes[tweetId] ? prevState[tweetId]+1 : !showLikes[tweetId][0] ? prevState[tweetId]+1 : prevState[tweetId]-1 
      }));
      updatedFormData['is_like'] = !showLikes[tweetId] ? true : !showLikes[tweetId][0];

    }
    else {
      console.log('dislike')
      setShowLikes((prevState) => ({
        ...prevState,
        [tweetId]: [prevState[tweetId] ? prevState[tweetId][1] ? prevState[tweetId][0] : false : false, !prevState[tweetId] ? true : !prevState[tweetId][1]],
      }));
      setShowLikeCount((prevState) => ({
        ...prevState,
        [tweetId]: !showLikeCount[tweetId] ? 0 : !showLikes[tweetId][0] ? prevState[tweetId] : prevState[tweetId]-1 
      }));
      updatedFormData['is_dislike'] = !showLikes[tweetId] ? true : !showLikes[tweetId][1];
    }
    
    try {
      console.log(updatedFormData)  
      let url = `connection/tweetlike/`
      const response = await utils.postData(url, updatedFormData,)
      console.log(response.status);
    }
    catch (error) {
      console.error('Error while posting data:', error);
    }
  };

  const fetchData = async () => {
    try {
      let url = `connection/tweet/`;
      const response = await utils.fetchData(url);
      setPosts(response.data);

      url = `connection/tweetlike/`;
      const like_response = await utils.fetchData(url);
      setShowLikes(like_response.data);
      console.log(showLikes)

      url = `connection/tweetlikecount/`;
      const likecount_response = await utils.fetchData(url);
      setShowLikeCount(likecount_response.data);
      console.log(showLikeCount)
    } 
    catch (error) {
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
              avatar='avatar'
              toggleReplies={() => toggleReplies(post.id)}
              isLike={showLikes[post.id] ? showLikes[post.id][0] : null}
              isdisLike={showLikes[post.id] ? showLikes[post.id][1] : null}
              toggleLikes={(like) => toggleLikes(post.id,like)}
              likecount = {showLikeCount[post.id] ? showLikeCount[post.id] : null}
            />
            <Reply tweetId={post.id} showReplies={showReplies[post.id]} />
          </div>
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;


