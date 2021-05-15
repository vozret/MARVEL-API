import React from "react";

import classes from "./PageButton.module.css";

const PageButton = (props) => {
  const id = props.id;
  let active = false;

  const handleClick = () => {
    props.onHandleClick(id);
  };

  if (id === props.currentPage) {
    active = true;
  }
  return (
    <button
      className={`${classes.button} ${active && classes.active}`}
      onClick={handleClick}
    >
      {props.id}
    </button>
  );
};

export default PageButton;
