import React from "react";
import Carousel from "react-bootstrap/Carousel";
import './index.css';

function CarouselItems({ movies }) {
  return (
    <div className="carousel-container">
      <Carousel className="carousel">
        {movies.map((movie) => (
          <Carousel.Item key={movie.id}>
            <img
              className="d-block"
              src={movie.image ? movie.image.original : ""}
              alt={movie.name}
            />
            <Carousel.Caption>
              <span style={{textAlign:"left"}}><strong>{movie.name}</strong></span>
              <p>{movie.summary.split(" ").slice(0, 20).join(" ")}</p>
            </Carousel.Caption>
            <div className="rating-badge">
              {movie.rating.average ? `${movie.rating.average}/10` : "N/A"}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselItems;
