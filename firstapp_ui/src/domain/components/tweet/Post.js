import React, { forwardRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, IconButton } from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import './Post.css';

const Post = forwardRef(
  (
    {
      id,
      user_id,
      displayName,
      username,
      userimage,
      verified,
      text,
      postimage,
      toggleReplies,
      isLike,
      isdisLike,
      toggleLikes,
      likecount,
      deleteTweet,
      commentCount,
    },
    ref
  ) => {
    const completeUserImageUrl = `${userimage}`;
    const completePostImageUrl = `${postimage}`;
    const [showOptions, setShowOptions] = useState(false);
    const [imageClass, setImageClass] = useState('');

    useEffect(() => {
      if (postimage) {
        const img = new Image();
        img.src = postimage;
        img.onload = () => {
          setImageClass(img.width > img.height ? 'landscape' : 'portrait');
        };
      }
    }, [postimage]);

    return (
      <div className="post" ref={ref}>
        <div className="post__avatar">
          <Link to={`/profile/${user_id}`}>
            <Avatar src={completeUserImageUrl} />
          </Link>
        </div>

        <div className="post__body">
          <div className="post__header">
            <div className="post__headerText" style={{ flexGrow: 1 }}>
              <h3>
                {displayName}{' '}
                <span className="post__headerSpecial">
                  {verified && <VerifiedUserIcon className="post__badge" />} @
                  {username}
                </span>
              </h3>
            </div>

            <div className="relative">
              <IconButton
                onClick={() => setShowOptions((prev) => !prev)}
                size="small"
              >
                <MoreHorizIcon fontSize="small" />
              </IconButton>

              {showOptions && (
                <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10">
                  <button
                    onClick={() => {
                      deleteTweet(id);
                      setShowOptions(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="post__headerDescription">
            <p>{text}</p>
          </div>

          {postimage && (
            <img
              src={completePostImageUrl}
              alt="post"
              className={`post__image ${imageClass}`}
            />
          )}

          <div className="post__footer">
            <div className="likeicons">
              <span onClick={() => toggleLikes(true)}>
                {isLike ? (
                  <ThumbUpIcon
                    fontSize="small"
                    className="favorite-icon-like"
                  />
                ) : (
                  <ThumbUpOffAltIcon fontSize="small" />
                )}
              </span>
              {likecount ? <div className="like-count">{likecount}</div> : null}
              <div className="likeicons-separator"></div>
              <span onClick={() => toggleLikes(false)}>
                {isdisLike ? (
                  <ThumbDownIcon
                    fontSize="small"
                    className="favorite-icon-like"
                  />
                ) : (
                  <ThumbDownOffAltIcon fontSize="small" />
                )}
              </span>
            </div>
            <span onClick={toggleReplies} className="relative">
              <ChatBubbleOutlineIcon fontSize="small" />
              {commentCount > 0 && (
                <span className="notification-badge">{commentCount}</span>
              )}
            </span>
          </div>
        </div>
      </div>
    );
  }
);

export default Post;
