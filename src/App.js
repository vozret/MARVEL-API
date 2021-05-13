import React from "react";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import Finder from "./Components/Finder";

function App() {
  return (
    <React.Fragment>
      <Header />
      <Finder />
      <Footer />
    </React.Fragment>
  );
}

export default App;
