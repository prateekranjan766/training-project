import React from "react";
import BreadCrumb from "../breadCrumb";
import ContentSection from "../contentSection";
import Footer from "../footer";
import Header from "../header";
import SubHeader from "../subHeader";

export const HomeScreen = ({ changeTheme }) => {
  return (
    <>
      <Header changeTheme={changeTheme} />
      <main>
        <BreadCrumb />
        <SubHeader />
        <ContentSection />
      </main>
      <Footer />
    </>
  );
};
