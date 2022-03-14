import { useImperativeHandle } from "react";
import "./message.styles.css";
import React from "react";

export const Message = ({ children, variant = "success" }) => {
  return <div className={`message ${variant}`}>{children}</div>;
};
