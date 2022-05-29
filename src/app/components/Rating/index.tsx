import React, {useState, useEffect, useRef} from 'react';
import './styles.scss';

interface Props {
  rating: number;
  totalStars: number;
}

const Rating = ({rating, totalStars}: Props) => {
  const [numberOfStars, setNumberOfStars] = useState<Array<number>>();

  const ratingRef = useRef(null);

  useEffect(() => {
    const starsArray = Array.from(Array(totalStars).keys()).map(i => i + 1);
    setNumberOfStars(starsArray);
    let percentage;
    if (rating <= 5) {
      percentage = (rating / 5) * 100;
    } else {
      percentage = (rating / 10) * 100;
    }
    const starPercentage = `${Math.floor(percentage)}%`;
    if (ratingRef) {
      // @ts-ignore: Object is possibly 'null'.
      ratingRef.current.style.width = starPercentage;
    }
  }, [numberOfStars, totalStars]);

  return (
    <div className="star-rating">
      <div className="back-stars">
        {numberOfStars?.map(i => (
          <React.Fragment key={i}>
            <i className="fa fa-star" aria-hidden="true" />
          </React.Fragment>
        ))}

        <div className="front-stars" ref={ratingRef}>
          {numberOfStars?.map(i => (
            <React.Fragment key={i}>
              <i className="fa fa-star" aria-hidden="true" />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rating;
