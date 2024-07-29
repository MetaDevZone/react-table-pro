import React, { useEffect, useState } from "react";
import {
  CustomPopoverSection,
  LocalPagination,
  TableHeadList,
  UserListToolbar,
  UserListToolbarsForSearch,
} from "./components";
import DownIcon from "./components/svg/DownIcon";
import UpIcon from "./components/svg/UpIcon";

const ReactDateTablePro = ({
  data,
  TABLE_HEAD,
  MENU_OPTIONS,
  checkbox_selection,
  isStickyHeader,
  isHideFooterPagination,
  isHideHeaderPagination,
  isHideSearch,
  custom_search,
  className,
  theme_config,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [filterName, setFilterName] = useState("");

  const selected_by = checkbox_selection?.selected_by;
  const setSelected = checkbox_selection?.setSelected;
  const selected = checkbox_selection?.selected;

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(filterName.toLowerCase())
  );

  const startIndex = page * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, filteredData.length);
  const slicedData = filteredData.slice(startIndex, endIndex);

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
    setPage(0);
  };

  const handleSearchText = (event) => {
    custom_search.setSearchText(event.target.value);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(data);
      return;
    }
    setSelected([]);
  };

  const [expandedRows, setExpandedRows] = useState([]);

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

  useEffect(() => {
    if (theme_config) {
      document.documentElement.style.setProperty(
        "--table-background-color",
        theme_config?.background
      );
      document.documentElement.style.setProperty(
        "--table-text-color",
        theme_config?.color
      );
      document.documentElement.style.setProperty(
        "--table-svg-color",
        theme_config?.iconColor
      );
    }
  }, [theme_config]);

  return (
    <div
      className={`table-container-pro ${className ? className : ""} ${
        isStickyHeader ? "sticky-header" : ""
      }`}
      // onScroll={trackScrollLeft}
    >
      {!isHideSearch && !isHideHeaderPagination && (
        <div className="thead-container-pro">
          <div className="pagination-container">
            {!isHideHeaderPagination && (
              <LocalPagination
                rowsPerPage={rowsPerPage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                filteredData={filteredData}
                handleChangePage={handleChangePage}
                page={page}
              />
            )}
          </div>
          <div className="table-search">
            {custom_search ? (
              <UserListToolbarsForSearch
                filterName={custom_search.searchText}
                onFilterName={handleSearchText}
                handleSubmit={custom_search.handleSubmit}
              />
            ) : (
              <>
                {!isHideSearch && (
                  <UserListToolbar
                    filterName={filterName}
                    onFilterName={handleFilterByName}
                  />
                )}
              </>
            )}
          </div>
        </div>
      )}
      <table className="responsive-table-pro">
        <thead>
          <TableHeadList
            headLabel={TABLE_HEAD}
            rowCount={filteredData.length}
            numSelected={checkbox_selection && selected?.length}
            checkbox_selection={checkbox_selection}
            handleSelectAllClick={handleSelectAllClick}
          />
        </thead>
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
                      if (head.type === "checkbox") {
                        return (
                          <td className={head.className} key={i}>
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
                          </td>
                        );
                      } else if (head.type === "radio_button") {
                        return (
                          <td className={head.className} key={i}>
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
                          </td>
                        );
                      } else if (head.type === "row_calendar") {
                        if (row.is_show_celendar === true) {
                          return (
                            <td className={head.className} key={i}>
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
                            </td>
                          );
                        } else {
                          return <td key={i}></td>;
                        }
                      } else if (head.type === "number") {
                        return (
                          <td className={head.className} key={i}>
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
                                    onClick={() =>
                                      handleExpandClick(row._id, index)
                                    }
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
                      } else if (head.type === "row_status") {
                        return (
                          <td className={head.className} key={i}>
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
                          </td>
                        );
                      } else if (head.type === "thumbnail") {
                        return (
                          <td className="head.className" key={i}>
                            {row[head.id]?.src ? (
                              <img
                                className="image-avatar"
                                alt={row[head.id]?.alt}
                                src={row[head.id]?.src}
                              />
                            ) : (
                              <div className="image_avatar">
                                {row[head.id]?.alt[0]}
                              </div>
                            )}
                          </td>
                        );
                      } else if (head.type === "link") {
                        return (
                          <td className={head.className} key={i}>
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
                            {options?.length > 0 && (
                              <CustomPopoverSection menu={options} data={row} />
                            )}
                          </td>
                        );
                      } else if (head.type === "html") {
                        return (
                          <td className={head.className} key={i}>
                            <div
                              className={row.className}
                              dangerouslySetInnerHTML={{
                                __html: row[head.id],
                              }}
                            ></div>
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
                      colSpan={
                        TABLE_HEAD.find(
                          (head) => head.type === "number"
                        ).show_history(row)?.colSpan ?? "10"
                      }
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
      </table>
      {!isHideFooterPagination && (
        <LocalPagination
          rowsPerPage={rowsPerPage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          filteredData={filteredData}
          handleChangePage={handleChangePage}
          page={page}
          footer
        />
      )}
    </div>
  );
};

export default ReactDateTablePro;
