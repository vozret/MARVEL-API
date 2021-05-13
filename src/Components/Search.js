import React from "react";
import classes from "./Search.module.css";

const Search = (props) => {
  const searchChangedHandler = (event) => {
    props.onChangeHandler(event.target.value);
  };

  return (
    <input
      className={classes.input}
      placeholder="Search For Your Hero"
      type="search"
      value={props.searchValue}
      onChange={searchChangedHandler}
    />
  );
};

export default Search;
