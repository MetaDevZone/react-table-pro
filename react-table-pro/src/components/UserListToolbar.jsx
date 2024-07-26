import React from "react";

export default function UserListToolbar({ filterName, onFilterName }) {
  return (
    <input
      type="text"
      value={filterName}
      onChange={onFilterName}
      placeholder="Search"
    />
  );
}
