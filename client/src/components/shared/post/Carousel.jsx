import React, { useState } from "react";

const Carousel = ({ images }) => {
  console.log(images);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = images?.length;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === images?.length - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? images?.length - 1 : currentSlide - 1);
  };

  return (
    <div className="ImageCarousel">
      <div className="image_carousel">
        {images?.map((image, index) => {
          return (
            <img
              key={index}
              src={image.imgUrl}
              alt="Post Image"
              className={
                currentSlide === index ? "slide" : "slide slide-hidden"
              }
            />
          );
        })}
        {images?.length > 1 && (
          <>
            <img
              src="/assets/icons/left-arrow.svg"
              alt="Left Arrow"
              className="image_carousel-arrow image_carousel-arrow-left"
              onClick={prevSlide}
            />
            <img
              src="/assets/icons/right-arrow.svg"
              alt="Right Arrow"
              className="image_carousel-arrow image_carousel-arrow-right"
              onClick={nextSlide}
            />
            <span className="image_carousel-dot-container">
              {images?.map((_, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={
                      currentSlide === index
                        ? "image_carousel-dot"
                        : "image_carousel-dot image_carousel-dot-inactive"
                    }
                  ></button>
                );
              })}
            </span>
            <span className="counter">
              {currentSlide + 1}/{totalSlides}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default Carousel;
