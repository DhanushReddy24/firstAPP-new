import React, { useState, useEffect } from "react";
import axios from 'axios';
import Post from "./Post";
import Reply from "./Reply";
import "./Feed.css";
import FlipMove from "react-flip-move";
import {useNavigate} from 'react-router-dom';


function Feed() {
  const [posts, setPosts] = useState([]);
  const [authTokens, setauthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : {"refresh": null, "access": null})
  const [userData, setuserData] = useState(()=> localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : {"id": null})
  const [formData, setFormData] = useState({'user':userData.id});
  const navigate = useNavigate();
  const [showReplies, setShowReplies] = useState({});
  const [showLikes, setShowLikes] = useState({});
  const apiDomain = process.env.REACT_APP_DJANGO_DOMAIN_NAME;


  const toggleReplies = (tweetId) => {
    setShowReplies((prevState) => ({
      ...prevState,
      [tweetId]: !prevState[tweetId],
    }));
  };
  const toggleLikes = async(tweetId) => {
    setShowLikes((prevState) => ({
      ...prevState,
      [tweetId]: [!prevState[tweetId] ? true : !prevState[tweetId][0],prevState[tweetId] ? prevState[tweetId][1] : null],
    }));
    const updatedFormData = {
      'user':userData.id,
      'tweet': tweetId,
      'is_like': !showLikes[tweetId] ? true : !showLikes[tweetId][0],
    };
    //console.log(tweetId,!showLikes[tweetId] ? true : !showLikes[tweetId][0])
    //postLike()
    try {
      console.log(updatedFormData)  
      let apiUrl = `${apiDomain}/connection/tweetlike/`
      console.log(apiUrl)
      const response = await axios.post(apiUrl, updatedFormData,
        {
          'headers': { 
            'Content-Type':'multipart/form-data',
            'Authorization': 'JWT ' +String(authTokens.access) 
          },
        }
      )
      console.log(response.status);
      //const { tweet, is_like, ...updatedFormData } = formData;
      //setFormData(updatedFormData);
      //setFormData({ ...formData, ['tweet']: null,['is_like']: null, });
      
    }
    catch (error) {
      console.error('Error while posting data:', error);
    }
  };

  const postLike = async(event) => {
    event.preventDefault();
    try {
      console.log(formData)  
      let apiUrl = `${apiDomain}/connection/tweetlike/`
      console.log(apiUrl)
      const response = await axios.post(apiUrl, updatedFormData,
        {
          'headers': { 
            'Content-Type':'multipart/form-data',
            'Authorization': 'JWT ' +String(authTokens.access) 
          },
        }
      )
      console.log(response.status);
      const { tweet, is_like, ...updatedFormData } = formData;
      setFormData(updatedFormData);
      //setFormData({ ...formData, ['tweet']: null,['is_like']: null, });
      
    }
    catch (error) {
      console.error('Error while posting data:', error);
    }
  };

  const fetchData = async () => {
    try {
      let apiUrl = `${apiDomain}/connection/tweet/`;

      console.log(apiUrl)
      console.log(authTokens.access)
      const response = await axios.get(apiUrl,{
        'headers': { 
          'Content-Type':'application/json',
          'Authorization': 'JWT ' +String(authTokens.access) 
        }
      });
      setPosts(response.data);

      apiUrl = `${apiDomain}/connection/tweetlike/`;

      console.log(apiUrl)
      console.log(authTokens.access)
      const like_response = await axios.get(apiUrl,{
        'headers': { 
          'Content-Type':'application/json',
          'Authorization': 'JWT ' +String(authTokens.access) 
        }
      });
      setShowLikes(like_response.data);
      console.log(showLikes)

    } 
    catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (authTokens.access != null) {
      console.log('fetching data')
      fetchData();
    }
    else{
      console.log('redirect to login')
      navigate('/login/');
    }
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
              toggleLikes={() => toggleLikes(post.id)}
            />
            <Reply tweetId={post.id} showReplies={showReplies[post.id]} />
          </div>
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;


