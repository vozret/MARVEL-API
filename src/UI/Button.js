import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      className={classes.button}
      onClick={props.onClick}
      disabled={props.disable}
    >
      {props.children}
    </button>
  );
};

export default Button;
