import React from "react";
import notFoundImg from "./not-found.jpeg";
import "./notFound.styles.css";

export const NotFound = () => {
  return <img src={notFoundImg} className="not-found__image" alt="not-found" />;
};
