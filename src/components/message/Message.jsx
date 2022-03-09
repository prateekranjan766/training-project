import "./message.styles.css";
export const Message = ({ children, variant = "success" }) => {
  return <div className={`message ${variant}`}>{children}</div>;
};
