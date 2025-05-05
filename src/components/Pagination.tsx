import React from 'react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onNextPage: (page: number) => void;
  onPreviousPage: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onNextPage, onPreviousPage }) => {
  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={() => onPreviousPage(currentPage - 1)}  // Pass the correct page number
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-700 text-white rounded-l hover:bg-gray-600"
      >
        Previous
      </button>
      <span className="px-4 py-2 text-white">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onNextPage(currentPage + 1)}  // Pass the correct page number
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-700 text-white rounded-r hover:bg-gray-600"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
