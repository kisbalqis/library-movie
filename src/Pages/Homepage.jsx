import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

import apiService from "../Service/apiService";
import CarouselItems from "../Components/Carousel";
import Navbars from "../Components/Navbar";
import CardPopular from "../Components/TrendingNow";
import CommingSoonCard from "../Components/CommingSoon";
import MovieAll from "../Components/MovieShow";

const Homepage = () => {
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showScroll, setShowScroll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await apiService.getShows();
        setMovieData(response);
      } catch (error) {
        console.error("Error fetching shows:", error);
      }
    };
    fetchShows();

    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleAddMovie = () => {
    navigate("/add-member"); 
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const menuItems = [
    { label: "Add Member", link: "#", onClick: handleAddMovie },
  ];

  return (
    <div>
      <Navbars brandName="Movie Library" navItems={menuItems} />
      <CarouselItems movies={movieData} className="mb-4" />
      <h3>Trending Now</h3>
      <CardPopular />
      <h3>Coming Soon</h3>
      <CommingSoonCard />
      <h3>All Movies</h3>
      <MovieAll />

      {showScroll && (
        <Button
          onClick={scrollToTop}
          className="button-scroll"
        >
          ↑
        </Button>
      )}
    </div>
  );
};

export default Homepage;
