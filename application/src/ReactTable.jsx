import React, { useEffect, useState } from "react";
import {
  Pagination,
  TableBody,
  TableHeadList,
  UserListToolbar,
  UserListToolbarsForSearch,
} from "./components";

const applyThemeConfig = (themeConfig) => {
  const setThemeProperty = (property, value) => {
    document.documentElement.style.setProperty(property, value);
  };

  if (themeConfig) {
    setThemeProperty("--table-background-color", themeConfig.background);
    setThemeProperty("--table-text-color", themeConfig.color);
    setThemeProperty("--table-svg-color", themeConfig.iconColor);
  }
};

const filterDataByName = (data, filterName) => {
  return data.filter((item) => {
    if (item?.name) {
      return item.name.toLowerCase().includes(filterName.toLowerCase());
    }
    return Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(filterName.toLowerCase())
    );
  });
};

const sliceData = (data, page, rowsPerPage) => {
  const startIndex = page * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, data.length);
  return data.slice(startIndex, endIndex);
};

const ReactTable = ({
  data,
  TABLE_HEAD,
  MENU_OPTIONS,
  checkbox_selection,
  is_sticky_header,
  is_hide_footer_pagination,
  is_hide_header_pagination,
  is_hide_search,
  custom_search,
  class_name,
  theme_config,
  custom_pagination,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  const [filterName, setFilterName] = useState("");
  const selected_by = checkbox_selection?.selected_by;
  const setSelected = checkbox_selection?.setSelected;
  const selected = checkbox_selection?.selected;

  const filteredData = filterDataByName(data, filterName);
  const slicedData = custom_pagination
    ? filteredData
    : sliceData(filteredData, page, rowsPerPage);

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
    setPage(0);
  };

  const handleSearchText = (event) => {
    custom_search.setSearchText(event.target.value);
  };

  const handleChangePage = (newPage) => {
    if (custom_pagination?.handleChangePage) {
      custom_pagination.handleChangePage(newPage);
      return;
    }
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(data);
      return;
    }
    setSelected([]);
  };

  useEffect(() => {
    applyThemeConfig(theme_config);
  }, [theme_config]);

  useEffect(() => {
    if (custom_pagination) {
      let { page, rows_per_page } = custom_pagination;

      if (page || page == 0) {
        setPage(page);
      }
      if (rows_per_page) {
        setRowsPerPage(rows_per_page);
      }
    }
  }, [custom_pagination]);

  console.log(slicedData, "slicedDataslicedData");

  return (
    <div
      className={`table-container-pro ${class_name ? class_name : ""} ${
        is_sticky_header ? "sticky-header" : ""
      }`}
    >
      {!is_hide_search && !is_hide_header_pagination && (
        <div className="thead-container-pro">
          <div className="pagination-container">
            {!is_hide_header_pagination && (
              <Pagination
                rowsPerPage={rowsPerPage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                filteredData={filteredData}
                handleChangePage={handleChangePage}
                page={page}
                custom_pagination={custom_pagination}
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
                {!is_hide_search && (
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
        <TableBody
          slicedData={slicedData}
          TABLE_HEAD={TABLE_HEAD}
          selected={selected}
          setSelected={setSelected}
          selected_by={selected_by}
          MENU_OPTIONS={MENU_OPTIONS}
          checkbox_selection={checkbox_selection}
          page={page}
          rowsPerPage={rowsPerPage}
        />
      </table>
      {!is_hide_footer_pagination && (
        <Pagination
          rowsPerPage={rowsPerPage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          filteredData={filteredData}
          handleChangePage={handleChangePage}
          page={page}
          custom_pagination={custom_pagination}
          footer={true}
        />
      )}
    </div>
  );
};

export default ReactTable;
