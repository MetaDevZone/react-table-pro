import React, { useRef, useState, useEffect } from "react";
import MenuIcon from "./svg/MenuIcon";
import CustomPopoverSectionItems from "./CustomPopoverSectionItems";

export default function CustomPopoverSection(props) {
  const { menu, data } = props;
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [searchInput, setSearchInput] = useState("");

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleOutsideClick = (e) => {
    if (anchorRef.current && !anchorRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={anchorRef}>
      <div
        onClick={handleOpen}
        style={{
          marginTop: 5,
        }}
        className="menu-icon"
      >
        <MenuIcon />
      </div>
      {open && (
        <div
          className="menu-popover-pro"
          style={{
            maxWidth: "330px",
          }}
        >
          <div className="menu-arrow-top-box"></div>
          {menu.length > 8 && (
            <div className="menu-search-box">
              <input
                className="menu-search-input"
                type="text"
                placeholder="Search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
          )}
          {menu
            .filter((option) =>
              option.label.toLowerCase().includes(searchInput.toLowerCase())
            )
            .map((option, i) => (
              <CustomPopoverSectionItems
                key={i}
                item={option}
                data={data}
                setOpen={setOpen}
              />
            ))}
        </div>
      )}
    </div>
  );
}
