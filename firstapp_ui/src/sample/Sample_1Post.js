import React, { forwardRef } from "react";
import "./Sample_1Post.css";
import { Avatar } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PublishIcon from "@mui/icons-material/Publish";

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
