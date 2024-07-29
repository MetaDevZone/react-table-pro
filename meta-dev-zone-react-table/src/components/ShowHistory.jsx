import React from "react";
import UpIcon from "./svg/UpIcon";
import DownIcon from "./svg/DownIcon";

export default function ShowHistory(props) {
  const { head, row, expandedRows, setExpandedRows, index } = props;

  const handleExpandClick = (rowId, index) => {
    let isExist = expandedRows.find((id) => id === rowId);
    let element = document.getElementsByClassName("history-container")[index];
    let height = element.offsetHeight;
    let selectedElement = element.parentElement;
    if (isExist) {
      selectedElement.style.maxHeight = 0;
    } else {
      selectedElement.style.maxHeight = `${height}px`;
    }
    setExpandedRows((old) =>
      old.includes(rowId) ? old.filter((id) => id !== rowId) : [...old, rowId]
    );
  };

  if (!head || !head.show_history || !head.show_history(row).is_show_history) {
    return <></>;
  }

  return (
    <div
      onClick={() => handleExpandClick(row._id, index)}
      className="history-div"
    >
      {head.show_history(row).icon ? (
        head.show_history(row).icon
      ) : expandedRows.includes(row._id) ? (
        <UpIcon />
      ) : (
        <DownIcon />
      )}
    </div>
  );
}
