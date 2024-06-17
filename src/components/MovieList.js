import React, { useState } from 'react';
import { movies } from './mov.js'; // Update the path to the correct location
import './MovieList.css';

const MovieList = () => {
  const [movieData, setMovieData] = useState(movies);

  return (
    <div className="movie-list">
      <h1>Movies</h1>
      <ul>
        {movieData.map(movie => (
          <li key={movie.title} className="movie-item">
            <img src={movie.thumbnail} alt={movie.title} width={movie.thumbnail_width} height={movie.thumbnail_height} />
            <h2>{movie.title} ({movie.year})</h2>
            
            <p><strong>Genres:</strong> {movie.genres.join(', ')}</p>
           
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
