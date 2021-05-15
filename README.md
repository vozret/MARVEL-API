# Blank-again

This is a simple web application made for browsing and bookmarking Marvel heroes.
You use it by just typing the name of the Marvel character. No need to press any search button (which doesn't exist btw).
You can bookmark character by just pressing 'Bookmark this character!' button.
You can bookmark unique character only once after which the bookmarking button will be disabled.

According to the compiling warning:
src/Components/Finder.js
  Line 97:6:  React Hook useEffect has a missing dependency: 'bookmarkedCharacters'. Either include it or remove the dependency array
  
  If 'bookmarkedCharacters' is set inside dependencies of useEffect hook, te app will be stuck inside infinite loop.
