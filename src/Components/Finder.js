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
        fetch(url)
          .then((response) => {
            console.log("This is response: ");
            console.log(response);
            return response.json();
          })
          .then((data) => {
            console.log(data.data);
            const extractedCharacterData = data.data.results.map(
              (character) => {
                return {
                  id: character.id,
                  name: character.name,
                  image:
                    character.thumbnail.path +
                    "/portrait_medium." +
                    character.thumbnail.extension,
                };
              }
            );
            console.log(extractedCharacterData);
            setFilteredCharacters(extractedCharacterData);
          });
      }
    }
    fetchMarvelCharactersHandler();
  }, [searchTerm]);

  const searchTermChangedHandler = (newValue) => {
    setSearchTerm(newValue);
  };

  return (
    <div className={classes["main-div"]}>
      <Search
        searchValue={searchTerm}
        onChangeHandler={searchTermChangedHandler}
      />
      <CharacterList data={filteredCharacters} />
    </div>
  );
};

export default Finder;
