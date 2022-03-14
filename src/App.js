import BreadCrumb from "./components/breadCrumb";
import React from "react";
import ContentSection from "./components/contentSection";
import Footer from "./components/footer";
import Header from "./components/header";
import SubHeader from "./components/subHeader";
import { useState } from "react";

function App() {
  // const [activeMenuIndex, setActiveMenuIndex] = useState(0);

  const [vegOnly, setVegOnly] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const vegOnlyFilter = () => {
    setVegOnly(!vegOnly);
  };

  // const setIndex = (index) => {
  //   setActiveMenuIndex(index);
  // };

  const onInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <Header />
      <main>
        <BreadCrumb />
        <SubHeader onClick={vegOnlyFilter} onChange={onInputChange} />
        <ContentSection
          isVegOnly={vegOnly}
          // activeMenuIndex={activeMenuIndex}
          // setActiveMenuIndex={setIndex}
          searchKeyword={inputValue}
        />
      </main>
      <Footer />
    </>
  );
}

export default App;
