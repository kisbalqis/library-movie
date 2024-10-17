import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import apiService from "../../Service/apiService";
import Navbars from "../Navbar";
import Cards from "../Card";

const CommingSoonCard = () => {
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await apiService.getShows();
        setMovieData(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching shows:", error);
        setError(error);
        setLoading(false);
      }
    };
    fetchShows();
  }, []);


  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array;
  };


  const getRandomMovies = (data) => {
    const shuffledMovies = shuffleArray([...data]);
    return shuffledMovies.slice(0, itemsPerPage);
  };

  const currentItems = getRandomMovies(movieData);

  return (
    <Container className="mt-5">
      <Row>
        {loading ? (
          <Col className="text-center">
            <Spinner animation="border" />
          </Col>
        ) : error ? (
          <Col>
            <Alert variant="danger">
              Error fetching movies: {error.message}
            </Alert>
          </Col>
        ) : (
          currentItems.map((show) => (
            <Col key={show.id} xs={12} md={6} lg={4} className="mb-4 px-2">
              <Cards
                imageUrl={show.image ? show.image.medium : ""}
                title={show.name}
                text={show.summary.split(" ").slice(0, 20).join(" ")}
                buttonText="View"
                rating={show.rating}
                genre={show.genres}
                className="card-container"
              />
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default CommingSoonCard;
