import React, { useState, useEffect } from "react";
import md5 from "md5";

import Search from "./Search";
import CharacterList from "./CharacterList";

import classes from "./Finder.module.css";

let baseUrl = "https://gateway.marvel.com/v1/public/characters";
const publicKey = "de9c23c41ac525f4f6d61d6179db6a4f";
const privateKey = "2a5e4b6158b09526bc4488f2ce805353fbff0745";
const ts = 1;
const stringToHash = ts + privateKey + publicKey;
const hash = md5(stringToHash);
// limit must not be greater than 100!
const limit = 100;

const Finder = (props) => {
  //logic will go here
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [bookmarkedCharacters, setBookmarkedCharacters] = useState([]);

  // useEffect(() => {
  //   setBookmarkedCharacters(
  //     JSON.parse(localStorage.getItem("bookmarkedHeroes")) || []
  //   );
  // }, []);

  localStorage.setItem(
    "bookmarkedHeroes",
    JSON.stringify(bookmarkedCharacters)
  );

  useEffect(() => {
    const url =
      baseUrl +
      "?nameStartsWith=" +
      encodeURIComponent(searchTerm) +
      "&limit=" +
      limit +
      "&ts=" +
      ts +
      "&apikey=" +
      publicKey +
      "&hash=" +
      hash;
    function fetchMarvelCharactersHandler() {
      if (searchTerm !== "") {
        //if (bookmarkedCharacters.length > 0) {
        // prvo prođi kroz bookmarkane elemente i pogledaj odgovara li koji element sa
        // searchTerm-om
        // takve elemente odvoji i prve ih prikaži u rezultatima pretraživanja
        //}
        // dohvatit localStorage i pretvorit ga u niz
        // const bookmarkedIds = (
        //   localStorage.getItem("bookmarkedHeros") || "[]"
        // ).toArray();
        fetch(url)
          .then((response) => {
            // console.log("This is response: ");
            console.log(response);
            return response.json();
          })
          .then((data) => {
            console.log(bookmarkedCharacters);
            // console.log(data.data);
            const extractedCharacterData = data.data.results.map(
              (character) => {
                return {
                  id: character.id,
                  name: character.name,
                  image:
                    character.thumbnail.path +
                    "/portrait_medium." +
                    character.thumbnail.extension,
                  // LSniz.find
                  isBookmarked: bookmarkedCharacters.find(
                    (item) => item.id === character.id
                  )
                    ? true
                    : false,
                };
              }
            );
            console.log(extractedCharacterData);
            setFilteredCharacters(extractedCharacterData);
          });
      } else {
        setFilteredCharacters(
          JSON.parse(localStorage.getItem("bookmarkedHeroes")) || []
          //bookmarkedCharacters
        );
      }
    }
    fetchMarvelCharactersHandler();
  }, [searchTerm]);

  const searchTermChangedHandler = (newValue) => {
    setSearchTerm(newValue);
  };

  function onBookmarkHandler(id) {
    console.log("Clicked! " + id);
    let characterToBookmark = filteredCharacters.find((item) => item.id === id);
    // console.log(characterToBookmark);
    characterToBookmark.isBookmarked = true;
    setBookmarkedCharacters((oldState) => [...oldState, characterToBookmark]);
    localStorage.setItem(
      "bookmarkedHeroes",
      JSON.stringify(bookmarkedCharacters)
    );
    console.log(bookmarkedCharacters);
    console.log(characterToBookmark);
    console.log(filteredCharacters);
    console.log(bookmarkedCharacters);
  }

  return (
    <div className={classes["main-div"]}>
      <Search
        searchValue={searchTerm}
        onChangeHandler={searchTermChangedHandler}
      />
      <CharacterList data={filteredCharacters} onBookmark={onBookmarkHandler} />
    </div>
  );
};

export default Finder;
