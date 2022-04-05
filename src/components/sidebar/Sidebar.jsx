import React from "react";
export const Sidebar = ({ menuList, activeMenuIndex, onClick }) => {
  return (
    <div className="sidebar">
      <ul className="sidebar__list">
        {menuList.map((item, index) => (
          <li
            key={index}
            className={
              index === activeMenuIndex
                ? "sidebar__list__item sidebar__list__item--active"
                : "sidebar__list__item"
            }
            onClick={() => onClick(index)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
