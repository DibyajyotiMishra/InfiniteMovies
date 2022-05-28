/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import './styles.scss';

interface Props {
  currentPage: number;
  totalPages: number;
  paginate: (type: 'prev' | 'next') => void;
}

const PaginateComponent = ({currentPage, totalPages, paginate}: Props) => {
  const [page, setPage] = useState<number>();
  const [totalPageNumber, setTotalPageNumber] = useState<number>();

  useEffect(() => {
    setPage(currentPage);
    setTotalPageNumber(totalPages);
  }, [currentPage, totalPages]);

  return (
    <>
      <span className="pageCount">
        {page} - {totalPageNumber}
      </span>
      <button
        className={currentPage > 1 ? 'paginate-button' : 'paginate-button disable'}
        onClick={() => paginate('prev')}
      >
        Prev
      </button>
      <button
        className={currentPage === totalPages ? 'paginate-button disable' : 'paginate-button'}
        onClick={() => paginate('next')}
      >
        Next
      </button>
    </>
  );
};

export default PaginateComponent;
