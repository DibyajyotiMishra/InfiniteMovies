/* eslint-disable consistent-return */
import React, {useState, useEffect} from 'react';
import loadingPlaceHolder from '../../assets/loading.gif';

interface Props {
  src: string;
  children: React.ReactNode;
  className: string;
}

const LazyImage = ({src, children, className}: Props) => {
  const [imgSrc, setImgSrc] = useState(loadingPlaceHolder);
  const [imgRef, setImgRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    let observer: IntersectionObserver;
    let didCancel: boolean = false;

    if (imgRef && imgSrc !== src) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if ((!didCancel && entry.intersectionRatio > 0) || entry.isIntersecting) {
                setImgSrc(src);
                observer.unobserve(imgRef);
              }
            });
          },
          {
            threshold: 0.01,
            rootMargin: '75%',
          },
        );
        observer.observe(imgRef);
      } else {
        setImgSrc(src);
      }
      return () => {
        didCancel = true;
        if (observer && observer.unobserve) {
          observer.unobserve(imgRef);
        }
      };
    }
  }, [src, imgSrc, imgRef]);

  return (
    <div className={className} style={{backgroundImage: `url(${imgSrc})`}} ref={setImgRef}>
      {children}
    </div>
  );
};

export default LazyImage;
