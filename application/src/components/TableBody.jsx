import React, { useState } from "react";
import CustomPopoverSection from "./CustomPopoverSection";
import ShowHistory from "./ShowHistory";

const TableBody = ({
  slicedData,
  TABLE_HEAD,
  selected,
  setSelected,
  selected_by,
  MENU_OPTIONS,
  checkbox_selection,
  page,
  rowsPerPage,
}) => {
  const [expandedRows, setExpandedRows] = useState([]);

  const handleClick = (name) => {
    const selectedIndex = selected?.some((obj) => {
      if (selected_by && selected_by !== "") {
        return obj[selected_by] === name[selected_by];
      } else {
        return obj._id === name._id;
      }
    });

    if (selectedIndex === true) {
      let new_array = selected.filter((item) => {
        if (selected_by && selected_by !== "") {
          return item[selected_by] !== name[selected_by];
        } else {
          return item._id !== name._id;
        }
      });
      setSelected(new_array);
    } else {
      setSelected((selected) => [...selected, name]);
    }
  };

  const historyHead = TABLE_HEAD.find((head) => head.show_history);

  const renderCell = (row, head, i, index) => {
    let historyObj = { head, row, index, expandedRows, setExpandedRows };

    if (head.type === "checkbox") {
      return (
        <td className={head.className} key={i}>
          <div className="number-div">
            <ShowHistory {...historyObj} />
            <input
              type="checkbox"
              checked={row[head.id]}
              className="cursor-pointer input-checkbox"
              onChange={(e) => {
                if (head.handleClick) {
                  head.handleClick(e, row, index);
                }
              }}
            />
          </div>
        </td>
      );
    } else if (head.type === "history") {
      return (
        <td className={head.className} key={i}>
          <ShowHistory {...historyObj} />
        </td>
      );
    } else if (head.type === "radio_button") {
      return (
        <td className={head.className} key={i}>
          <div className="number-div">
            <ShowHistory {...historyObj} />
            <input
              type="radio"
              checked={row[head.id]}
              className="cursor-pointer input-checkbox"
              onChange={(e) => {
                if (head.handleClick) {
                  head.handleClick(e, row, index);
                }
              }}
            />
          </div>
        </td>
      );
    } else if (head.type === "row_calendar") {
      if (row.is_show_celendar === true) {
        return (
          <td className={head.className} key={i}>
            <div className="number-div">
              <ShowHistory {...historyObj} />
              <input
                type="date"
                className={`${head.className} date-picker`}
                onChange={(date) => {
                  if (head.handleChangeDate) {
                    head.handleChangeDate(date, index, row);
                  }
                }}
                value={row[head.id]}
              />
            </div>
          </td>
        );
      } else {
        return <td key={i}></td>;
      }
    } else if (head.type === "number") {
      return (
        <td className={head.className} key={i}>
          <div className="number-div">
            <ShowHistory {...historyObj} />
            <span
              className={row.className}
              onClick={() => {
                if (head.handleClick) {
                  head.handleClick(row, index);
                }
              }}
            >
              {index + 1 + rowsPerPage * page}
            </span>
          </div>
        </td>
      );
    } else if (head.type === "row_status") {
      return (
        <td className={head.className} key={i}>
          <div className="number-div">
            <ShowHistory {...historyObj} />
            <div
              className={`${
                row[head.id] === true
                  ? "custom-chip-success " + row.className
                  : "custom-chip-error"
              }`}
              onClick={() => {
                if (head.handleClick) {
                  head.handleClick(row, index);
                }
              }}
            >
              {row[head.id] === true ? "Active" : "Inactive"}
            </div>
          </div>
        </td>
      );
    } else if (head.type === "thumbnail") {
      return (
        <td className={head.className} key={i}>
          <div className="number-div">
            <ShowHistory {...historyObj} />
            {row[head.id]?.src ? (
              <img
                className="image-avatar"
                alt={row[head.id]?.alt}
                src={row[head.id]?.src}
              />
            ) : (
              <div className="image_avatar">{row[head.id]?.alt[0]}</div>
            )}
          </div>
        </td>
      );
    } else if (head.type === "link") {
      return (
        <td className={head.className} key={i}>
          <div className="number-div">
            <ShowHistory {...historyObj} />
            {row[head.id].show_text ? (
              <a
                href={row[head.id].to}
                className={row[head.id].className}
                target={row[head.id].target}
              >
                {row[head.id].show_text}
              </a>
            ) : row[head.id].show_alternate_text ? (
              row[head.id].show_alternate_text
            ) : (
              ""
            )}
          </div>
        </td>
      );
    } else if (head.type === "action") {
      let type_of = typeof MENU_OPTIONS;
      let options = MENU_OPTIONS;
      if (type_of === "function") {
        options = MENU_OPTIONS(row);
      }
      return (
        <td className={head.className} key={i}>
          <div className="number-div">
            <ShowHistory {...historyObj} />
            {options?.length > 0 && (
              <CustomPopoverSection menu={options} data={row} />
            )}
          </div>
        </td>
      );
    } else if (head.type === "html") {
      return (
        <td className={head.className} key={i}>
          <div className="number-div">
            <ShowHistory {...historyObj} />
            <div
              className={row.className}
              dangerouslySetInnerHTML={{
                __html: row[head.id],
              }}
            ></div>
          </div>
        </td>
      );
    } else {
      return (
        <td className={head.className} key={i}>
          {head.renderData ? (
            head.renderData(row, index)
          ) : (
            <span
              className={row.className}
              onClick={() => {
                if (head.handleClick) {
                  head.handleClick(row, index);
                }
              }}
            >
              {row[head.id]}
            </span>
          )}
        </td>
      );
    }
  };

  return (
    <>
      {slicedData.length > 0 ? (
        <tbody>
          {slicedData.map((row, index) => {
            const isItemSelected =
              selected?.length < 1
                ? false
                : selected?.some((obj) => {
                    if (selected_by && selected_by !== "") {
                      return obj[selected_by] === row[selected_by];
                    } else {
                      return obj._id === row._id;
                    }
                  });

            return (
              <React.Fragment key={index}>
                <tr
                  tabIndex={-1}
                  role="checkbox"
                  selected={isItemSelected}
                  aria-checked={isItemSelected}
                >
                  {checkbox_selection && (
                    <td>
                      <input
                        type="checkbox"
                        checked={isItemSelected}
                        className="cursor-pointer input-checkbox"
                        onChange={() => handleClick(row)}
                      />
                    </td>
                  )}
                  {TABLE_HEAD.map((head, i) => {
                    return renderCell(row, head, i, index);
                  })}
                </tr>
                <tr
                  className="history-tr"
                  style={{
                    borderBottom: expandedRows.includes(row._id)
                      ? "1px solid"
                      : "none",
                  }}
                >
                  <td
                    colSpan={TABLE_HEAD.length}
                    style={{
                      padding: 0,
                    }}
                  >
                    <div className="no_hover">
                      <div className="history-container">
                        {historyHead
                          ? historyHead.show_history(row).component
                          : ""}
                      </div>
                    </div>
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      ) : (
        <tbody>
          <tr>
            <td
              colSpan={
                checkbox_selection ? 1 + TABLE_HEAD.length : TABLE_HEAD.length
              }
              className="data-not-found"
            >
              Data Not Found
            </td>
          </tr>
        </tbody>
      )}
    </>
  );
};

export default TableBody;
