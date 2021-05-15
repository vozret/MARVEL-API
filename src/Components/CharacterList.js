import React, { useState } from "react";

import classes from "./CharacterList.module.css";

import CharacterItem from "./CharacterItem";
import PageButton from "../UI/PageButton";

const CharacterList = (props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const heroesPerPage = 20;
  const indexOfLastHero = heroesPerPage * currentPage;
  const indexOfFirstHero = indexOfLastHero - heroesPerPage;
  const pageNumbers = [];

  const heroesToDisplay = props.data.slice(indexOfFirstHero, indexOfLastHero);

  for (let i = 1; i <= Math.ceil(props.data.length / heroesPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (id) => {
    setCurrentPage(Number(id));
  };

  const Buttons = pageNumbers.map((page) => {
    return (
      <PageButton
        key={page}
        id={page}
        onHandleClick={handlePageChange}
        currentPage={currentPage}
      />
    );
  });

  let content = heroesToDisplay
    //.filter((item) => item.bookmarked)
    .map((item) => {
      return (
        <CharacterItem
          key={item.id}
          id={item.id}
          name={item.name}
          picture={item.image}
          bookmarked={item.isBookmarked}
          onBookmark={props.onBookmark}
        />
      );
    });
  if (content.length === 0) {
    content = <div>There are no heroes (yet).</div>;
  }

  return (
    <React.Fragment>
      <div className={classes["characters-grid"]}>{content}</div>
      <div className={classes["button-div"]}>{Buttons}</div>
    </React.Fragment>
  );
};

export default CharacterList;
