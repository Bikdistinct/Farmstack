import React, { useState } from "react";
import "./Share.css";
import { PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material";
export default function Share(props) {

  const feedsInitial = [];
  const [feeds, setFeeds] = useState(feedsInitial);
  const addFeed = async (description) => {
    //todo api call
    const response = await fetch("/api/feed/addfeed", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        // "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ description }),
    });

    const json = await response.json();
    console.log(json);

    console.log("add func");
    const feed = json;

    setFeeds(feeds.concat(feed));
  };

  const [feed, setFeed] = useState({ description: "" });
  const handleClick = (e) => {
    console.log("click");
    e.preventDefault();
    addFeed(feed.description);
    setFeed({ description: "" });
    // props.showAlert("Added successfully", "success");
  };

  const onChange = (e) => {
    setFeed({ ...feed, [e.target.name]: e.target.value });
    console.log("change");
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={process.env.PUBLIC_URL + "/user.png"}
            alt=""
          />
          <input
            placeholder="What's in your mind?"
            id="description"
            name="description"
            value={feed.description}
            onChange={onChange}
            minLength={5}
            required
            className="shareInput"
          />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
            </div>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" onClick={handleClick}>
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
