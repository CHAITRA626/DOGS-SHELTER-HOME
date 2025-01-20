import React from 'react';
import '../styles/Pagination.css'

interface PaginationProps {
  total: number;
  size: number;
  currentPage: number;
  onPageChange: (newFrom: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ total, size, currentPage, onPageChange }) => {
  const pages = Math.ceil(total / size);

  // Navigate to a specific page
  const handlePageChange = (page: number) => {
    onPageChange(page * size);
  };

  const handleNext = () => {
    if (currentPage < pages - 1) {
      onPageChange((currentPage + 1) * size);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      onPageChange((currentPage - 1) * size);
    }
  };

  return (
    <div className="pagination">

      {/* First Page Button */}
      <button
        disabled={currentPage === 0}
        onClick={() => handlePageChange(0)}
      >
        &lt;&lt;
      </button>

      {/* Previous Button */}
      <button
        disabled={currentPage === 0}
        onClick={handlePrevious}
      >
        &lt;
      </button>

      {/* Current Page */}
      <span>{currentPage + 1} of {pages}</span>

      {/* Next Button */}
      <button
        disabled={currentPage === pages - 1}
        onClick={handleNext}
      >
        &gt;
      </button>

      {/* Last Page Button */}
      <button
        disabled={currentPage === pages - 1}
        onClick={() => handlePageChange(pages - 1)}
      >
        &gt;&gt;
      </button>

    </div>
  );
};

export default Pagination;
