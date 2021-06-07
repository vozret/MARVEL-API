# MARVEL-API

This is a simple web application made for browsing and bookmarking Marvel heroes.
Use it by just typing the name of the Marvel character. No need to press any search button (which doesn't exist btw).
You can bookmark character by just pressing 'Bookmark this character!' button.
You can bookmark unique character only once after which the bookmarking button will be disabled.

According to the compiling warning:
src/Components/Finder.js
<<<<<<< HEAD
Line 97:6: React Hook useEffect has a missing dependency: 'bookmarkedCharacters'. Either include it or remove the dependency array

=======
I didn't include bookmarkedCharacters in the dependencies list because the app would be stuck inside infinite loop.

## FILES

### App.js:

"Main" file (here used like layout).

### Header.js and Footer.js:

Used only to layout the headr and footer text.
In previous version of this project, search component was in the header. But for various reasons (and simplicity), Search component was moved to Finder component.

### Finder.js:

This is the main component with all the app logic.
There are three states:
filteredCharacters: used for displaying marvel heroes whose names correspond to the searchTerm state.
searchTerm: used for storing the users input
bookmarkedCharacters: used for communication with the local storage

When the application renders for the first time, useEffect hook is run. Since the local storage is empty at this point, filteredCharacters will be set to an empty string.
If there are stored characters, filteredCharacters will be set to the list of objects in the local storage. filteredCharacters do not depend on the previous state.
useEffect hook will be run every time the searchTerm changes.
For fetching characters, I didn't use any library (like axios). Because the goal of this project was to use only React as much as possible.

### onBookmarkHandler:

  function onBookmarkHandler(id) {
    let characterToBookmark = filteredCharacters.find((item) => item.id === id);
    // console.log(characterToBookmark);
    characterToBookmark.isBookmarked = true;
    setBookmarkedCharacters((oldState) => [...oldState, characterToBookmark]);
    localStorage.setItem(
      "bookmarkedHeroes",
      JSON.stringify([...bookmarkedCharacters, characterToBookmark])
    );
  }
  
I set new bookmarked character in the local storage like this: JSON.stringify([...bookmarkedCharacters, characterToBookmark])
Because if I put JSON.stringify(bookmarkedCharacters).
The list in the local storage would be lagging one step.

### CharacterList.js:

Via props gets the whole filteredCharacters list which then maps to every CharacterItem. Implements pagination.
