import './App.css';
import React from 'react';
import api from './api/axiosConfig.js'
import {useState, useEffect} from 'react';
import Layout from "./components/Layout.js";
import {Routes, Route} from 'react-router-dom';
import Home from "./components/home/Home.js";
import Header from "./components/header/Header.js";
import Trailer from "./components/trailer/Trailer.js";
import Reviews from "./components/reviews/Reviews.js";

function App() {

    const [movies, setMovies] = useState();
    const [movie, setMovie] = useState();
    const [reviews, setReviews] = useState();

    useEffect(() => {
        getMovies();
    }, [])

    const getMovies = async () => {
        try {
            const response = await api.get("/api/v1/movies/showAll");
            console.log(response.data);
            setMovies(response.data);
        } catch (err) {
            console.log('fail to fetch movies from API error' + err);
        }
    }

    const getMovieData = async (movieId) => {
        try {
            const response = await api.get(`/api/v1/movies/${movieId}`);

            const singleMovie = response.data;

            setMovie(singleMovie);
            setReviews(singleMovie.reviews)
        } catch (err) {
            console.log('fail to fetch movies from API error' + err);
        }
    }


    return (
        <div className="App">

            <Header/>

            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route path="/" element={<Home movies={movies}/>}></Route>
                    <Route path="/Trailer/:youTubeTrailerId" element={<Trailer/>}></Route>
                    <Route path="/Reviews/:movieId" element={<Reviews getMovieData={getMovieData} movie={movie} reviews={reviews??[]} setReviews={setReviews}/>}></Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
