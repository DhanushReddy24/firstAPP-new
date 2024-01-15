import React, { forwardRef } from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ReplyIcon from '@material-ui/icons/Reply';
import PublishIcon from "@material-ui/icons/Publish";


const Post = forwardRef(
  ({ id, displayName, username, userimage, verified, text, postimage, avatar, toggleReplies,isLike=false,toggleLikes}, ref) => {

    const completeUserImageUrl = `http://127.0.0.1:8000${userimage}`;
    const completePostImageUrl = `http://127.0.0.1:8000${postimage}`;
    return (
      <div className="post" ref={ref}>
        <div className="post__avatar">
          <Avatar src={completeUserImageUrl} />
        </div>
        <div className="post__body">
          <div className="post__header">
            <div className="post__headerText">
              <h3>
                {displayName}{" "}
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
          {postimage!==null && <img src={completePostImageUrl} alt="post image"/> }
          <div className="post__footer">
            <ChatBubbleOutlineIcon fontSize="small" />
            <RepeatIcon fontSize="small" />
            <span onClick={toggleLikes} >
              {isLike? (<FavoriteIcon fontSize="small" className="favorite-icon-like" />):((<FavoriteBorderIcon fontSize="small"/>))}
            </span>
            <PublishIcon fontSize="small" />
            <span onClick={toggleReplies} >
              <ReplyIcon fontSize="small" />
            </span>
          </div>
        </div>
      </div>
    );
  }
);

export default Post;
