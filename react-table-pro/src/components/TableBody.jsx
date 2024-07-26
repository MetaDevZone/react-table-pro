import React, { useState } from "react";
import UpIcon from "./svg/UpIcon";
import DownIcon from "./svg/DownIcon";
import CustomPopoverSection from "./CustomPopoverSection";

const TableBody = ({
  slicedData,
  TABLE_HEAD,
  selected,
  setSelected,
  selectedBy,
  MENU_OPTIONS,
  checkboxSelection,
  page,
  rowsPerPage,
}) => {
  const [expandedRows, setExpandedRows] = useState([]);

  // Handle row selection
  const handleClick = (row) => {
    const isSelected = selected.some((item) =>
      selectedBy ? item[selectedBy] === row[selectedBy] : item._id === row._id
    );

    if (isSelected) {
      setSelected(
        selected.filter((item) =>
          selectedBy
            ? item[selectedBy] !== row[selectedBy]
            : item._id !== row._id
        )
      );
    } else {
      setSelected([...selected, row]);
    }
  };

  // Handle row expansion for additional content
  const handleExpandClick = (rowId, index) => {
    let isExist = expandedRows.find((id) => id === rowId);
    let element = document.getElementsByClassName("history-container")[index];
    console.log(element, "elementelement");
    if (element) {
      let height = element.offsetHeight;
      let selectedElement = element.parentElement;
      if (isExist) {
        selectedElement.style.maxHeight = 0;
      } else {
        selectedElement.style.maxHeight = `${height}px`;
      }
    }
    setExpandedRows((old) =>
      old.includes(rowId) ? old.filter((id) => id !== rowId) : [...old, rowId]
    );
  };

  // Render table cell based on column type
  const renderCell = (row, head, index) => {
    switch (head.type) {
      case "checkbox":
        return (
          <td className={head.className} key={index}>
            <input
              type="checkbox"
              checked={row[head.id]}
              className="cursor-pointer input-checkbox"
              onChange={(e) => head.handleClick?.(e, row, index)}
            />
          </td>
        );
      case "radio_button":
        return (
          <td className={head.className} key={index}>
            <input
              type="radio"
              checked={row[head.id]}
              className="cursor-pointer input-checkbox"
              onChange={(e) => head.handleClick?.(e, row, index)}
            />
          </td>
        );
      case "row_calendar":
        return row.is_show_calendar ? (
          <td className={head.className} key={index}>
            <input
              type="date"
              className={`${head.className} date-picker`}
              onChange={(date) => head.handleChangeDate?.(date, index, row)}
              value={row[head.id]}
            />
          </td>
        ) : (
          <td key={index}></td>
        );
      case "number":
        return (
          <td className={head.className} key={index}>
            <span
              className={`number-div ${row.className}`}
              onClick={() => {
                if (head.handleClick) {
                  head.handleClick(row, index);
                }
              }}
            >
              {head.show_history(row).is_show_history ? (
                <>
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
                </>
              ) : null}
              {index + 1 + rowsPerPage * page}
            </span>
          </td>
        );
      case "row_status":
        return (
          <td className={head.className} key={index}>
            <div
              className={
                row[head.id]
                  ? `custom-chip-success ${row.className}`
                  : "custom-chip-error"
              }
              onClick={() => head.handleClick?.(row, index)}
            >
              {row[head.id] ? "Active" : "Inactive"}
            </div>
          </td>
        );
      case "thumbnail":
        return (
          <td className="head.className" key={index}>
            {row[head.id]?.src ? (
              <img
                className="image-avatar"
                alt={row[head.id]?.alt}
                src={row[head.id]?.src}
              />
            ) : (
              <div className="image-avatar">{row[head.id]?.alt[0]}</div>
            )}
          </td>
        );
      case "link":
        return (
          <td className={head.className} key={index}>
            {row[head.id].show_text ? (
              <a
                href={row[head.id].to}
                className={row[head.id].className}
                target={row[head.id].target}
              >
                {row[head.id].show_text}
              </a>
            ) : (
              row[head.id].show_alternate_text
            )}
          </td>
        );
      case "action":
        const options =
          typeof MENU_OPTIONS === "function" ? MENU_OPTIONS(row) : MENU_OPTIONS;
        return (
          <td className={head.className} key={index}>
            {options?.length > 0 && (
              <CustomPopoverSection menu={options} data={row} />
            )}
          </td>
        );
      case "html":
        return (
          <td className={head.className} key={index}>
            <div
              className={row.className}
              dangerouslySetInnerHTML={{ __html: row[head.id] }}
            ></div>
          </td>
        );
      default:
        return (
          <td className={head.className} key={index}>
            {head.renderData ? (
              head.renderData(row, index)
            ) : (
              <span
                className={row.className}
                onClick={() => head.handleClick?.(row, index)}
              >
                {row[head.id]}
              </span>
            )}
          </td>
        );
    }
  };

  return (
    <tbody>
      {slicedData?.length > 0 ? (
        slicedData.map((row, rowIndex) => {
          const isItemSelected =
            Array.isArray(selected) &&
            selected.some((item) =>
              selectedBy
                ? item[selectedBy] === row[selectedBy]
                : item._id === row._id
            );

          return (
            <React.Fragment key={rowIndex}>
              <tr
                tabIndex={-1}
                role="checkbox"
                selected={isItemSelected}
                aria-checked={isItemSelected}
              >
                {checkboxSelection && (
                  <td>
                    <input
                      type="checkbox"
                      checked={isItemSelected}
                      className="cursor-pointer input-checkbox"
                      onChange={() => handleClick(row)}
                    />
                  </td>
                )}
                {TABLE_HEAD.map((head, colIndex) =>
                  renderCell(row, head, colIndex)
                )}
              </tr>
              {expandedRows.includes(row._id) && (
                <tr
                  className="history-tr"
                  style={{
                    borderBottom: expandedRows.includes(row._id)
                      ? "1px solid"
                      : "none",
                  }}
                >
                  <td
                    colSpan="10"
                    style={{
                      padding: expandedRows.includes(row._id) ? "16px" : 0,
                    }}
                  >
                    <div className="no_hover">
                      <div className="history-container">
                        {
                          TABLE_HEAD.find(
                            (head) => head.type === "number"
                          ).show_history(row).component
                        }
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          );
        })
      ) : (
        <tr>
          <td
            colSpan={
              checkboxSelection ? 1 + TABLE_HEAD.length : TABLE_HEAD.length
            }
            className="data-not-found"
          >
            Data Not Found
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default TableBody;
