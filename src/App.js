import BreadCrumb from "./components/breadCrumb";
import ContentSection from "./components/contentSection";
import Footer from "./components/footer";
import Header from "./components/header";
import React from "react";
import SubHeader from "./components/subHeader";

function App() {
  return (
    <>
      <Header />
      <main>
        <BreadCrumb />
        <SubHeader />
        <ContentSection />
      </main>
      <Footer />
    </>
  );
}

export default App;
