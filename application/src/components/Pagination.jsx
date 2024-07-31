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
  custom_pagination,
}) => {
  let data_length = filteredData ? filteredData.length : 0;
  if (custom_pagination?.total_pages || custom_pagination?.total_pages == 0) {
    data_length = custom_pagination?.total_pages;
  }
  const startIndex = page * rowsPerPage;
  const startIndexLength = startIndex ? startIndex : 0;
  const endIndex = Math.min(startIndexLength + rowsPerPage, data_length);
  const endIndexLength = endIndex ? endIndex : 0;

  const totalPages = Math.ceil(data_length / rowsPerPage);

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
      {custom_pagination && (
        <div
          className={`button-top custom-buttons ${
            footer ? "footer-count" : ""
          }`}
        >
          <button
            onClick={() => handleChangePage(page - 1)}
            disabled={page === 0}
          >
            <PageLeft />
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handleChangePage(index)}
              className={`page-count ${index === page ? "active" : ""}`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handleChangePage(page + 1)}
            disabled={endIndex >= data_length}
          >
            <PageRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default LocalPagination;
