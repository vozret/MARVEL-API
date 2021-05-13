import React from "react";

import classes from "./CharacterList.module.css";

import CharacterItem from "./CharacterItem";

const CharacterList = (props) => {
  let content = props.data
    //.filter((item) => item.bookmarked)
    .map((item) => {
      return (
        <CharacterItem
          key={item.id}
          id={item.id}
          name={item.name}
          picture={item.image}
          bookmarked={item.bookmarked}
          onBookmark={props.onBookmark}
        />
      );
    });
  if (content.length === 0) {
    content = <div>There are no heroes (yet).</div>;
  }

  return <div className={classes["characters-grid"]}>{content}</div>;
};

export default CharacterList;
