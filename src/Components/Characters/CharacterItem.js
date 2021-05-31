import React from "react";

import Button from "../../UI/Button";

import classes from "./CharacterItem.module.css";

const CharacterItem = (props) => {
  let buttonText = "Bookmark this character!";
  if (props.bookmarked) {
    buttonText = "Bookmarked!";
  }

  const onClickHandler = () => {
    props.onBookmark(props.id);
  };

  return (
    <div className={classes["character-item"]}>
      <img
        src={props.picture}
        alt={props.name + "picture"}
        className={classes.image}
      />
      <p>Name: {props.name}</p>
      <p>
        Bookmark Status: {props.bookmarked && "Bookmarked!"}{" "}
        {!props.bookmarked && "Not Bookmarked!"}
      </p>
      <Button onClick={onClickHandler}>{buttonText}</Button>
    </div>
  );
};

export default CharacterItem;
