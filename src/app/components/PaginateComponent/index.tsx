import React from 'react';
import './styles.scss';

const PaginateComponent = () => {
  return (
    <>
      <span className="pageCount">1 - 20</span>
      <button className="paginate-button disable">Prev</button>
      <button className="paginate-button">Next</button>
    </>
  );
};

export default PaginateComponent;
