import React, {useState} from 'react';
import PaginateComponent from '../PaginateComponent';
import Slider from './slider';
import './styles.scss';

function Carousel() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const paginate = (type: 'prev' | 'next') => {
    if (type === 'prev' && currentPage >= 1) {
      setCurrentPage(prev => prev - 1);
    } else {
      setCurrentPage(prev => prev + 1);
    }
  };

  return (
    <div className="carousel">
      <Slider />
      <div className="grid-movie-title">
        <div className="movieType">Now Playing</div>
        <div className="paginate">
          <PaginateComponent currentPage={currentPage} totalPages={10} paginate={paginate} />
        </div>
      </div>
    </div>
  );
}

export default Carousel;
