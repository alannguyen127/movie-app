import React, { createContext, useState, useContext } from "react";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  return (
    <SearchContext.Provider
      value={{ results, setResults, isSearching, setIsSearching }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}
