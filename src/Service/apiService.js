import React from 'react';

const API_URL = "https://api.tvmaze.com";

const apiService = {
  getShows: async () => {
    try {
      const url = `${API_URL}/shows`;
      const response = await fetch(url, {
        headers: {
          Accept: 'application/json',
        },
      });
      return response.json();
    } catch (error) {
      console.error('Error fetching shows:', error);
      throw new Error('Failed to fetch shows. Please try again later.');
    }
  },

  getMostPopular: async () => {
    try {
      const shows = await apiService.getShows();
      const mostPopular = shows
        .sort((a, b) => (b.rating && b.rating.average || 0) - (a.rating && a.rating.average || 0))
        .slice(0, 10); 
      return mostPopular;
    } catch (error) {
      console.error('Error fetching most popular shows:', error);
      throw new Error('Failed to fetch most popular shows. Please try again later.');
    }
  },

  getShowById: async (id) => {
    try {
      const url = `${API_URL}/shows/${id}`;
      const response = await fetch(url, {
        headers: {
          Accept: 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching show details:', error);
      throw new Error('Failed to fetch show details. Please try again later.');
    }
  },
  
};

export default apiService;
