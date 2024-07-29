import React from "react";

export default function UserListToolbarsForSearch({
  filterName,
  onFilterName,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        className="custom-input"
        type="text"
        value={filterName}
        onChange={onFilterName}
        placeholder="Search"
      />
      <button className="custom-button">Search</button>
    </form>
  );
}
