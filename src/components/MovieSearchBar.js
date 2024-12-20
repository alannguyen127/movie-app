import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { API_KEY, BASE_URL } from "../app/config";
import { useSearch } from "../contexts/SearchContext";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
function MovieSearchBar({ onResults }) {
  const [query, setQuery] = useState("");

  const { setIsSearching } = useSearch();

  // const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
    console.log(query);

    if (value.length > 2) {
      // setLoading(true);
      setIsSearching(true);
      try {
        const response = await fetch(
          `${BASE_URL}search/movie?query=${value}&api_key=${API_KEY}`
        );
        const data = await response.json();
        onResults(data.results || []);
        // console.log(results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
      // finally {
      //   setLoading(false);
      // }
    }
    if (value.length === 0) {
      onResults([]);
      setIsSearching(false);
    }
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search Movies..."
        inputProps={{ "aria-label": "search" }}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleSearch}
        fullWidth
      />
    </Search>
  );
}

export default MovieSearchBar;
