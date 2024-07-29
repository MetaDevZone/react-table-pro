import React, { useEffect, useState } from "react";

export default function TableHeadList({
  headLabel,
  checkbox_selection,
  handleSelectAllClick,
  rowCount,
  numSelected,
}) {
  const [tableHead, setTableHead] = useState([]);

  useEffect(() => {
    let updatedHeadLabel = [...headLabel];

    if (checkbox_selection) {
      const select_all = {
        id: "is_checkbox_selected",
        label: (
          <input
            type="checkbox"
            checked={rowCount === numSelected}
            onClick={(e) => handleSelectAllClick(e)}
            className="cursor-pointer input-checkbox"
          />
        ),
      };
      updatedHeadLabel = [select_all, ...updatedHeadLabel];
    }

    setTableHead(updatedHeadLabel);
  }, [headLabel, rowCount, numSelected]);

  return (
    <tr>
      {tableHead.map((headCell, index) => (
        <th key={index}>{headCell.label}</th>
      ))}
    </tr>
  );
}
