import React from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import { movies } from './mov'; // Assuming you have a movies array

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Slider.css'; // Import the CSS file

const Home = () => {

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll:1,
    
  };
  const navigate = useNavigate();
  const handleMovieClick = (movie) => {
    navigate('/theater-list', { state: { movie } });
  };

  return (
    <div className="home-page">
      <h1>Home</h1>
      <section id="now-showing">
        <h2>Now Showing</h2>
        <Slider {...settings}>
          {movies.map((movie, index) => (
              <div key={index} className="movie-card" onClick={() => handleMovieClick(movie)}>
              <img src={movie.thumbnail} alt={movie.title} />
              <h3>{movie.title}</h3>
              
            </div>
          ))}
        </Slider>
      </section>
    </div>
  );
};

export default Home;
