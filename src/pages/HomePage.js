import React, { useState, useEffect } from "react";

import TrendingMovieList from "../components/TrendingMovieList";

import apiService from "../app/apiService";
import { API_KEY } from "../app/config";
import Grid from "@mui/material/Grid";
import Category from "../components/Category";
import MovieResultList from "../components/MovieResultList";
import { useSearch } from "../contexts/SearchContext";

function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState("");
  const [cutInitial, setcutInitial] = useState();
  const { results } = useSearch();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await apiService.get(
          `/trending/all/day?api_key=${API_KEY}`
        );
        const result = res.data.results;
        setTrendingMovies(result);
        setcutInitial([...result].splice(16, 4));
        // setError("");
      } catch (error) {
        console.log(error.message);
      }
      setLoading(false);
    };
    getData();
  }, []);

  return results.length > 0 ? (
    <MovieResultList results={results} />
  ) : (
    <>
      <Grid
        container
        direction="column"
        justifyContent={{ md: "center", xs: "flex-end" }}
        sx={{
          minHeight: "100vh",
        }}
      >
        <Grid item direction="column" container>
          <MovieResultList />
        </Grid>
        <Grid item direction="column" container>
          <TrendingMovieList
            trendingMovies={trendingMovies}
            cutInitial={cutInitial}
            loading={loading}
          />
        </Grid>

        <Grid item direction="column" mt={5} container>
          <Category />
        </Grid>
      </Grid>
    </>
  );
}

export default HomePage;
