
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../Service/apiService';

const ShowDetail = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Show ID:', id); 

    const fetchShowDetails = async () => {
      try {
        if (id) {
          const data = await apiService.getShowById(id);
          setShow(data);
        } else {
          throw new Error('Show ID is undefined');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShowDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!show) {
    return <div>No show found.</div>;
  }

  return (
    <div>
      <h1>{show.name}</h1>
      {show.image && <img src={show.image.medium} alt={show.name} />}
      <p>{show.summary}</p>
      <h2>Rating: {show.rating.average}</h2>
      <h3>Genres: {show.genres.join(', ')}</h3>
    </div>
  );
};

export default ShowDetail;
