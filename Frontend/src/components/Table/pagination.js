import React from "react";

const Pagination = ({ currentPage, totalPages, handlePageChange, commonStyles }) => (
  <div className="flex space-x-1">
    <button
      className={commonStyles.button}
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      Prev
    </button>

    {[...Array(totalPages)].map((_, i) => (
      <button
        key={i}
        className={`min-w-9 rounded-full py-2 px-3 text-sm transition-all ${
          currentPage === i + 1
            ? "bg-vivid-blue text-white"
            : "border border-light-gray hover:bg-vivid-blue hover:text-white"
        }`}
        onClick={() => handlePageChange(i + 1)}
      >
        {i + 1}
      </button>
    ))}

    <button
      className={commonStyles.button}
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      Next
    </button>
  </div>
);

export default Pagination;