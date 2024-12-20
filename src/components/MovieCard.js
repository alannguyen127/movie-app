import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import RecommendIcon from "@mui/icons-material/Recommend";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import "../App.css";

function MovieCard({ item }) {
  return (
    <Card className="card" sx={{ width: "100%", borderRadius: "10px" }}>
      <CardActionArea LinkComponent={Link} to={`/movie/${item.id}`}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-end"
          sx={[
            {
              backgroundImage: `url(https://image.tmdb.org/t/p/original/${item.poster_path})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            },
          ]}
          style={{ aspectRatio: "9/16" }}
        >
          <Paper className="content">
            <CardContent>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                sx={[
                  {
                    maxHeight: "30%",
                    overflow: "hidden",
                  },
                ]}
              >
                <Typography
                  gutterBottom
                  variant="body1"
                  component="div"
                  color={"white"}
                >
                  {`${
                    item.original_title
                      ? item.original_title
                      : item.original_name
                  }`}
                </Typography>

                <Stack flexDirection="row" justifyContent="flex-end" mt={1}>
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                    mr={3}
                  >
                    <RecommendIcon
                      className="recommend_icon"
                      fontSize="small"
                    />
                    <Typography variant="subtitle2" ml={1} color={"white"}>
                      {`${item.vote_average}`}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                  >
                    <FavoriteIcon className="favorite_icon" fontSize="small" />
                    <Typography variant="subtitle2" ml={1} color={"white"}>
                      {`${item.vote_count}`}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </CardContent>
          </Paper>
        </Box>
      </CardActionArea>
    </Card>
  );
}

export default MovieCard;
