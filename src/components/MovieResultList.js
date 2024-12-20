import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MovieCard from "./MovieCard";
import { useSearch } from "../contexts/SearchContext";
import { Box } from "@mui/material";

function MovieResultList() {
  const { results, isSearching } = useSearch();
  if (!isSearching) return null;

  return (
    <Box sx={{ mt: 4, p: 2 }}>
      {results.length > 0 ? (
        <>
          <Typography
            variant="h5"
            sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}
          >
            Search Results
          </Typography>
          <Grid container spacing={3}>
            {results.map((movie) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                <MovieCard item={movie} />
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            mt: 10,
            color: "gray",
            fontStyle: "italic",
          }}
        >
          No movies found. Try searching for something else!
        </Typography>
      )}
    </Box>
  );
}

export default MovieResultList;
