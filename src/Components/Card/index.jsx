import React, { useState, useEffect } from "react";
import { Card, Button, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Cards = ({ id, imageUrl, title, text, buttonText, rating, genre }) => {
  const [shows, setShows] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchShows = async () => {
      const data = await apiService.getMostPopular();
      setShows(data);
    };

    fetchShows();
  }, []);

  
  const handleClick = () => {
    navigate(`/movies/${id}`);
  };

  return (
    <Card className="card-containers">
      <Card.Img variant="top" src={imageUrl} alt={title} />
      <Card.Body>
        <Card.Title className="card-title">{title}</Card.Title>
        <Card.Text className="card-summary">{text}...</Card.Text>
        
        <div className="genre-containers mb-3">
          {genre && genre.length > 0 ? (
            genre.map((g, index) => (
              <Badge key={index} pill variant="secondary" className="genre-badge">
                {g}
              </Badge>
            ))
          ) : (
            <span>No genres available</span>  
          )}
        </div>

        <div className="rating-containers mb-3">
          <Badge className="rating-badge">
            {rating && rating.average ? rating.average : 'N/A'}
          </Badge>
        </div>

        {shows.map(show => (
          <li key={show.id}>
            <Link to={`/shows/${show.id}`}>{show.name}</Link>
          </li>
        ))}
        <Button variant="warning" onClick={handleClick}>{buttonText}</Button>
      </Card.Body>
    </Card>
  );
};

export default Cards;
