import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { GET_MOVIES_API, API_KEY } from "../../utils/Constants";
import ThemeSelector from "./styles/ThemeSelector";
import { MovieCard } from "./components";

const getMovies = async () => {
  try {
    const res = await fetch(GET_MOVIES_API);
    const data = await res.json();
    return data.results;
  } catch (e) {
    return { message: e.message };
  }
};

const MoviesPage = () => {
  const [movies, setMovies] = useState(null);

  useEffect(() => {

    (async () => {
      const _movies = await getMovies();
      setMovies(_movies);
    })();
    
  }, [0]);

  return (
    <ThemeSelector>
      <Container className="movies-container">
        {movies &&
          movies.map((movie) => (
            <MovieCard
              title={movie.original_title}
              imageUrl={`https://image.tmdb.org/t/p/original/${movie.poster_path}?api_key=${API_KEY}}`}
            />
          ))}
      </Container>
    </ThemeSelector>
  );
};

export default MoviesPage;
