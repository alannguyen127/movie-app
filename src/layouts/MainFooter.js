import React from "react";
import { Link, Typography } from "@mui/material";

function MainFooter() {
  return (
    <div>
      <Typography variant="body2" align="center" mt={4} mb={2}>
        <Link
          color="inherit"
          href="https://www.themoviedb.org/"
          target="_blank"
        >
          Data by The Movie Database
        </Link>
      </Typography>
    </div>
  );
}

export default MainFooter;
