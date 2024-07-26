import React, { useEffect, useState } from "react";
import {
  LocalPagination,
  TableBody,
  TableHeadList,
  UserListToolbar,
  UserListToolbarsForSearch,
} from "./components";

const DataTable = ({
  data,
  TABLE_HEAD,
  MENU_OPTIONS,
  checkboxSelection,
  isStickyHeader,
  isHideFooterPagination,
  isHideHeaderPagination,
  isHideSearch,
  customSearch,
  className,
  themeConfig,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [filterName, setFilterName] = useState("");

  // Filter data based on search query
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(filterName.toLowerCase())
  );

  // Calculate pagination indices
  const startIndex = page * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, filteredData.length);
  const slicedData = filteredData.slice(startIndex, endIndex);

  // Handle search filter change
  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
    setPage(0);
  };

  // Handle custom search input change
  const handleSearchText = (event) => {
    customSearch.setSearchText(event.target.value);
  };

  // Handle pagination page change
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle select all checkbox click
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      checkboxSelection?.setSelected(data);
      return;
    }
    checkboxSelection?.setSelected([]);
  };

  const update_css_vars = (variable, value) => {
    document.documentElement.style.setProperty(variable, themeConfig[value]);
  };

  useEffect(() => {
    if (themeConfig) {
      update_css_vars("--table-background-color", "background");
      update_css_vars("--table-text-color", "color");
      update_css_vars("--table-svg-color", "iconColor");
    }
  }, [themeConfig]);

  return (
    <div
      className={`table-container-pro ${className || ""} ${
        isStickyHeader ? "sticky-header" : ""
      }`}
    >
      {!isHideSearch && !isHideHeaderPagination && (
        <div className="thead-container-pro">
          <LocalPagination
            rowsPerPage={rowsPerPage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            filteredData={filteredData}
            handleChangePage={handleChangePage}
            page={page}
          />
          <div className="table-search">
            {customSearch ? (
              <UserListToolbarsForSearch
                filterName={customSearch.searchText}
                onFilterName={handleSearchText}
                handleSubmit={customSearch.handleSubmit}
              />
            ) : (
              !isHideSearch && (
                <UserListToolbar
                  filterName={filterName}
                  onFilterName={handleFilterByName}
                />
              )
            )}
          </div>
        </div>
      )}
      <table className="responsive-table-pro">
        <thead>
          <TableHeadList
            headLabel={TABLE_HEAD}
            rowCount={filteredData.length}
            numSelected={checkboxSelection?.selected?.length}
            checkboxSelection={checkboxSelection}
            handleSelectAllClick={handleSelectAllClick}
          />
        </thead>
        {/* <TableBody
          slicedData={slicedData}
          TABLE_HEAD={TABLE_HEAD}
          selected={checkboxSelection?.selected}
          setSelected={checkboxSelection?.setSelected}
          selectedBy={checkboxSelection?.selectedBy}
          MENU_OPTIONS={MENU_OPTIONS}
          checkboxSelection={checkboxSelection}
          page={page}
          rowsPerPage={rowsPerPage}
        /> */}
        {slicedData.length > 0 ? (
          <tbody>
            {slicedData.map((row, index) => {
              const isItemSelected =
                checkboxSelection?.selected?.length < 1
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
                      colSpan="10"
                      style={{
                        padding: expandedRows.includes(row._id) ? "16px" : 0,
                      }}
                    >
                      <div className="no_hover">
                        {
                          TABLE_HEAD.find(
                            (head) => head.type === "number"
                          ).show_history(row).component
                        }
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

export default DataTable;
