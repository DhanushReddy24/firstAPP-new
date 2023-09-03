import React, { forwardRef } from "react";
import "./Sample_1Post.css";
import { Avatar } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";

function Sample_1Post({ Id, username, firstname, lastname, age, address, time, imageUrl }){

  const completeImageUrl = `http://127.0.0.1:8000${imageUrl}`;

  return (
    <div className="post">
      <div className="post__avatar">
      </div>
      <div className="post__body">
        <div className="post__header">
          <div className="post__headerText">
            <h3>
              {firstname}{" "}{lastname}{" "}
              <span className="post__headerSpecial">
                @{username}
              </span>
            </h3>
          </div>
          <div className="post__headerDescription">
            <p>{age}</p>
            <p>{address}</p>
            <p>{time}</p>
            <img src={completeImageUrl} alt="Image" />
          </div>
        </div>
        <div className="post__footer">
          <ChatBubbleOutlineIcon fontSize="small" />
          <RepeatIcon fontSize="small" />
          <FavoriteBorderIcon fontSize="small" />
          <PublishIcon fontSize="small" />
        </div>
      </div>
    </div>
  );
}
  
export default Sample_1Post;
