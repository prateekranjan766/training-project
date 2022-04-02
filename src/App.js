import BreadCrumb from "./components/breadCrumb";
import ContentSection from "./components/contentSection";
import Footer from "./components/footer";
import Header from "./components/header";
import React, { useState } from "react";
import SubHeader from "./components/subHeader";
import { ThemeContext } from "./context/themeContext";

function App() {
  const [isLightTheme, setIsLightTheme] = useState(true);

  const changeTheme = () => {
    setIsLightTheme(!isLightTheme);
  };

  return (
    <>
      <Header changeTheme={changeTheme} />
      <main>
        <BreadCrumb />
        <SubHeader />
        <ThemeContext.Provider value={isLightTheme}>
          <ContentSection />
        </ThemeContext.Provider>
      </main>
      <Footer />
    </>
  );
}

export default App;
