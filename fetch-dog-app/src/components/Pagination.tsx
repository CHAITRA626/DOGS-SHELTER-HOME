import React, { useState, useEffect } from 'react';
import '../styles/Pagination.css';

interface PaginationProps {
  total: number;
  size: number;
  currentPage: number;
  onPageChange: (newFrom: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ total, size, currentPage, onPageChange }) => {
  const pages = Math.ceil(total / size);
  const [inputPage, setInputPage] = useState(currentPage + 1);

  useEffect(() => {
    setInputPage(currentPage + 1);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 0 && page < pages) {
      onPageChange(page * size);
    } else {
      onPageChange(0); 
    }
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputPage(value ? parseInt(value, 10) : 0);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handlePageChange(inputPage - 1);
    }
  };

  const handleInputBlur = () => {
    handlePageChange(inputPage - 1);
  };

  return (
    <div className="pagination">
      <button disabled={currentPage === 0} onClick={() => handlePageChange(0)}>
        &lt;&lt;
      </button>
      <button disabled={currentPage === 0} onClick={handlePrevious}>
        &lt;
      </button>
      <span>Page </span>
      <input
        type="number"
        value={inputPage}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        onBlur={handleInputBlur}
        min="1"
        max={pages}
        className="page-input"
      />
      <span> of {pages}</span>

      <button disabled={currentPage === pages - 1} onClick={handleNext}>
        &gt;
      </button>
      <button disabled={currentPage === pages - 1} onClick={() => handlePageChange(pages - 1)}>
        &gt;&gt;
      </button>
    </div>
  );
};

export default Pagination;
