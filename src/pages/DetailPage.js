import React, { useEffect, useState } from "react";
import apiService from "../app/apiService";
import { API_KEY } from "../app/config";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import MovieDetailCard from "../components/MovieDetailCard";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function MovieItemPage() {
  // let location = useLocation();
  let auth = useAuth();
  console.log(auth.user);
  let { movieId } = useParams();
  const [loading, setLoading] = useState();
  const [movieDetail, setMovieDetail] = useState(null);
  useEffect(() => {
    console.log("Movie ID", movieId);
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await apiService.get(
          `movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
        );
        console.log("Data", res.data);
        setMovieDetail(res.data);
        setLoading(false);
      } catch (e) {
        console.log("Error", e.message);
      }
    };
    fetchData();
  }, [movieId]);

  return (
    <>
      <Typography variant="h4" mb={2} mt={10}>
        MOVIE INFO
      </Typography>
      <Divider />

      <MovieDetailCard movieDetail={movieDetail} loading={loading} />
    </>
  );
}

export default MovieItemPage;
