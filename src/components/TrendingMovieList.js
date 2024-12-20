import MovieCard from "./MovieCard";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PaginationItem from "@mui/material/PaginationItem";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";

const limit = 4;

function TrendingMovieList({ trendingMovies, loading, cutInitial }) {
  const [cutList, setCutList] = useState([]);
  const [page, setPage] = useState(0);

  function handleNextList() {
    // let y;
    // if (copiedList.length === 0) {
    //   setcopiedList([...trendingMovies]);
    //   y = [...trendingMovies].slice(0, 4);
    //   copiedList.splice(0, 4);
    // } else if (copiedList.length === 4) {
    //   setcopiedList([...trendingMovies]);
    //   y = copiedList.splice(0, 4);
    // } else {
    //   y = copiedList.splice(4, 4);
    // }
    // return y;
    setPage((p) => {
      return limit * (p + 1) >= trendingMovies.length ? p : p + 1;
    });
  }

  function handlePrevList() {
    setPage((p) => {
      return p - 1 < 0 ? 0 : p - 1;
    });
  }

  useEffect(() => {
    setCutList(() =>
      [...trendingMovies].slice(limit * page, limit * (page + 1))
    );
    // console.log([...trendingMovies].slice(limit * page, limit * (page + 1)));
  }, [page, trendingMovies]);

  // if (copiedList.length === 0) {
  //   setcopiedList([...trendingMovies]);
  //   y = [...trendingMovies].slice(0, 4);
  //   copiedList.splice(0, 4);
  // } else if (copiedList.length === 4) {
  //   setcopiedList([...trendingMovies]);
  //   y = copiedList.splice(0, 4);
  // } else {
  //   y = copiedList.splice(4, 4);
  // }
  // return y;

  const placeholder = [0, 1, 2, 3];
  const detailSkeleton = (
    <Stack spacing={1}>
      <Skeleton variant="text" />
      <Skeleton variant="rectangular" width="100%" height={300} />
    </Stack>
  );
  return (
    <>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h5" my={3}>
          TRENDING
        </Typography>
        <div>
          <PaginationItem
            onClick={handlePrevList}
            type="previous"
            disabled={page === 0}
          />
          <PaginationItem
            onClick={handleNextList}
            type="next"
            disabled={limit * (page + 1) >= trendingMovies.length}
          />
        </div>
      </Stack>
      <Divider />
      <Grid container direction="row" spacing={5} mt={2}>
        {loading
          ? placeholder.map((item) => (
              <Grid key={item.id} item xs={6} sm={4} md={3}>
                {detailSkeleton}
              </Grid>
            ))
          : cutList
          ? cutList.map((item) => (
              <Grid key={item.id} item xs={6} sm={4} md={3}>
                <MovieCard item={item} />
              </Grid>
            ))
          : cutInitial?.map((item) => (
              <Grid key={item.id} item xs={6} sm={4} md={3}>
                <MovieCard item={item} />
              </Grid>
            ))}
      </Grid>
    </>
  );
}

export default TrendingMovieList;
