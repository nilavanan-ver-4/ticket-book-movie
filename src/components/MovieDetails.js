import React from 'react';
import './MovieDetails.css';

const MovieDetails = ({ movie }) => {
  return (
    <div className="movie-details">
      <h2>{movie.title}</h2>
      <p>{movie.description}</p>
      <p><strong>Release Date:</strong> {movie.releaseDate}</p>
    </div>
  );
};

export default MovieDetails;
