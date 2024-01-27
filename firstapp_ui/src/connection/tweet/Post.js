import React, { forwardRef } from "react";
import "./Post.css";
import { Avatar } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ReplyIcon from '@mui/icons-material/Reply';
import PublishIcon from "@mui/icons-material/Publish";


const Post = forwardRef(
  ({ id, displayName, username, userimage, verified, text, postimage, avatar, toggleReplies,isLike=false,toggleLikes}, ref) => {

    const apiDomain = process.env.REACT_APP_DJANGO_DOMAIN_NAME;
    
    const completeUserImageUrl = `${apiDomain}${userimage}`;
    const completePostImageUrl = `${apiDomain}${postimage}`;
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
