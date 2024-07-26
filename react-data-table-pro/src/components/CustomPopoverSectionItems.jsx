import React, { useState } from "react";
import UpIcon from "./svg/UpIcon";
import DownIcon from "./svg/DownIcon";

export default function CustomPopoverSectionItems(props) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const { item, data, setOpen } = props;

  const handleClickDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  return (
    <>
      <div
        className="list-items-button"
        onClick={(e) => {
          if (item.child_options) {
            handleClickDropdown();
          } else {
            e.preventDefault();
            setOpen(false);
            item.handleClick(data);
          }
        }}
      >
        {item.icon && item.icon}
        <span
          style={{
            marginLeft: "12px",
          }}
        >
          {item.label}
        </span>
        <span className="menu-dropdown-icon">
          {item.child_options && (openDropdown ? <UpIcon /> : <DownIcon />)}
        </span>
      </div>
      {item.child_options && item.child_options.length > 0 && (
        <div>
          {openDropdown &&
            item.child_options.map((child_option, index) => {
              return (
                <div
                  className="menus-child-items"
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(false);
                    child_option.handleClick(data);
                  }}
                >
                  {child_option.icon && child_option.icon}
                  <span
                    style={{
                      marginLeft: "12px",
                    }}
                  >
                    {child_option.label}
                  </span>
                </div>
              );
            })}
        </div>
      )}
    </>
  );
}
