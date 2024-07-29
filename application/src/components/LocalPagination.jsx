import React from "react";
import PageLeft from "./svg/PageLeft";
import PageRight from "./svg/PageRight";

const LocalPagination = ({
  rowsPerPage,
  handleChangeRowsPerPage,
  filteredData,
  handleChangePage,
  page,
  footer,
}) => {
  const data_length = filteredData ? filteredData.length : 0;
  const startIndex = page * rowsPerPage;
  const startIndexLength = startIndex ? startIndex : 0;
  const endIndex = Math.min(startIndexLength + rowsPerPage, data_length);
  const endIndexLength = endIndex ? endIndex : 0;
  return (
    <div className="pagination-container">
      <div
        className={`pagination-page-select ${
          footer ? "pagination-footer" : ""
        }`}
      >
        <span> Rows per page: </span>
        <select
          value={rowsPerPage}
          className="cursor-pointer"
          onChange={handleChangeRowsPerPage}
        >
          {[10, 20, 50, 100].map((pageSize, index) => (
            <option className="cursor-pointer" key={index} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
        <div className="pagination-count">{`${
          startIndexLength + 1
        }-${endIndexLength} of ${data_length}`}</div>
        <div className="button-top">
          <button
            onClick={() => handleChangePage(page - 1)}
            disabled={page === 0}
            style={{
              paddingLeft: 0,
              paddingRight: "20px",
            }}
          >
            <PageLeft />
          </button>
          <button
            onClick={() => handleChangePage(page + 1)}
            disabled={endIndex >= data_length}
          >
            <PageRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocalPagination;
