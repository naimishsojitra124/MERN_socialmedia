import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSwipeable } from 'react-swipeable';

const Carousel = React.memo(({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = images?.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const handlers = useSwipeable({
    onSwipedLeft: useCallback(() => {
      if (currentSlide < totalSlides - 1) {
        nextSlide();
      }
    }, [currentSlide, totalSlides, nextSlide]),
    onSwipedRight: useCallback(() => {
      if (currentSlide > 0) {
        prevSlide();
      }
    }, [currentSlide, prevSlide]),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className='ImageCarousel' {...handlers}>
      <div className='image_carousel'>
        {images?.map((image, index) => (
          <img
            key={index}
            src={image.imgUrl}
            alt='Post img'
            className={currentSlide === index ? 'slide' : 'slide slide-hidden'}
          />
        ))}
        {images?.length > 1 && (
          <>
            <img
              src='/assets/icons/left-arrow.svg'
              alt='Left Arrow'
              className='image_carousel-arrow image_carousel-arrow-left'
              onClick={prevSlide}
              style={{
                display: currentSlide === 0 ? 'none' : 'block',
              }}
            />
            <img
              src='/assets/icons/right-arrow.svg'
              alt='Right Arrow'
              className='image_carousel-arrow image_carousel-arrow-right'
              onClick={nextSlide}
              style={{
                display: currentSlide === images?.length - 1 ? 'none' : 'block',
              }}
            />
            <span className='image_carousel-dot-container'>
              {images?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={
                    currentSlide === index
                      ? 'image_carousel-dot'
                      : 'image_carousel-dot image_carousel-dot-inactive'
                  }></button>
              ))}
            </span>
            <span className='counter'>
              {currentSlide + 1}/{totalSlides}
            </span>
          </>
        )}
      </div>
    </div>
  );
});

Carousel.propTypes = {
  images: PropTypes.array,
};

export default Carousel;
