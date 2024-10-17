import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap"; // Removed Pagination import here
import apiService from "../../Service/apiService";
import Navbars from "../Navbar";
import Cards from "../Card";
import Paginations from "../Pagination";

const MovieAll = () => {
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = movieData.slice(indexOfFirstItem, indexOfLastItem);
  
  const totalPages = Math.ceil(movieData.length / itemsPerPage); 

  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
     
      <Row>
        <Col className="d-flex justify-content-end">
          <Paginations 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default MovieAll;
