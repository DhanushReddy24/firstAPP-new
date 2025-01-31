import React, { forwardRef } from 'react';
import './Post.css';
import { Avatar } from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import RepeatIcon from '@mui/icons-material/Repeat';
import ReplyIcon from '@mui/icons-material/Reply';
import PublishIcon from '@mui/icons-material/Publish';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const Post = forwardRef(
  (
    {
      id,
      displayName,
      username,
      userimage,
      verified,
      text,
      postimage,
      avatar,
      toggleReplies,
      isLike,
      isdisLike,
      toggleLikes,
      likecount,
      deleteTweet,
    },
    ref
  ) => {
    const apiDomain = process.env.REACT_APP_DJANGO_DOMAIN_NAME;

    const completeUserImageUrl = `${userimage}`;
    const completePostImageUrl = `${postimage}`;

    const getImageAspectClass = (url) => {
      const img = new Image();
      img.src = url;

      return new Promise((resolve) => {
        img.onload = () => {
          if (img.width > img.height) {
            resolve('landscape');
          } else {
            resolve('portrait');
          }
        };
      });
    };

    return (
      <div className="post" ref={ref}>
        <div className="post__avatar">
          <Avatar src={completeUserImageUrl} />
        </div>
        <span 
        // onClick={() => deleteTweet(id)        }
        >
          <MoreHorizIcon fontSize="small" />
        </span>
        <div className="post__body">
          <div className="post__header">
            <div className="post__headerText">
              <h3>
                {displayName}{' '}
                <span className="post__headerSpecial">
                  {verified && <VerifiedUserIcon className="post__badge" />} @
                  {username}
                </span>
              </h3>
            </div>
            <div className="post__headerDescription">
              <p>{text}</p>
            </div>
          </div>
          {postimage && (
            <img
              src={completePostImageUrl}
              alt="post"
              className={`post__image`}
              onLoad={async () => {
                const aspectClass = await getImageAspectClass(completePostImageUrl);
                document.querySelector('.post__image').classList.add(aspectClass);
              }}
            />
          )}
          <div className="post__footer">
            <ChatBubbleOutlineIcon fontSize="small" />
            <RepeatIcon fontSize="small" />
            <div className="likeicons">
              <span onClick={() => toggleLikes(true)}>
                {isLike ? (
                  <ThumbUpIcon fontSize="small" className="favorite-icon-like" />
                ) : (
                  <ThumbUpOffAltIcon fontSize="small" />
                )}
              </span>
              <span>
                {likecount ? (
                  <div className="like-count">{likecount}</div>
                ) : null}{' '}
              </span>
              <div className="likeicons-separator"></div>
              <span onClick={() => toggleLikes(false)}>
                {isdisLike ? (
                  <ThumbDownIcon fontSize="small" className="favorite-icon-like" />
                ) : (
                  <ThumbDownOffAltIcon fontSize="small" />
                )}
              </span>
            </div>
            <PublishIcon fontSize="small" />
            <span onClick={toggleReplies}>
              <ReplyIcon fontSize="small" />
            </span>
          </div>
        </div>
      </div>
    );
  }
);

export default Post;