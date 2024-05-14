import './Hero.css';
import React from 'react';
import {Paper, CircularProgress} from '@mui/material';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import {faCirclePlay} from "@fortawesome/free-solid-svg-icons/faCirclePlay";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";

const Hero = ({movies}) => {
    if (!movies) {
        return (
            <div className="spinner-container">
                <CircularProgress/>
            </div>
        );
    } else {
        return (
            <div className="movie-carousel-container">
                <Carousel interval={4000} autoPlay={true} showArrows={true}>
                    {movies.map((movie) => ( // Wrap this line inside curly braces {}
                        <div key={movie.id}>
                            <Paper>
                                <div className="movie-card-container">
                                    <div className="movie-card"
                                         style={{"--img": `url(${movie.backdrops[0]})`}}> {/*background*/}
                                        <div className="movie-detail">
                                            <div className="movie-poster"> {/*small photo*/}
                                                <img src={movie.poster} alt=""/>
                                            </div>
                                            <div className="movie-title">
                                                <h4>{movie.title}</h4>
                                            </div>
                                            <div className="movie-buttons-container">
                                                <Link
                                                    to={`/Trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}`}>
                                                    <div className="play-button-icon-container">
                                                        <FontAwesomeIcon className="play-button-icon"
                                                                         icon={faCirclePlay} size="lg"/>
                                                    </div>
                                                </Link>

                                                <Link to={`/Reviews/${movie.imdbId}`}>
                                                    <div className="movie-review-button-container">
                                                        <Button variant="info">Reviews</Button>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Paper>
                        </div>
                    ))}
                </Carousel>
            </div>
        );
    }
};

export default Hero;
