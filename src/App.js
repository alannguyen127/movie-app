import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import ThemeProvider from "./contexts/ThemeProvider";
import { SearchProvider } from "./contexts/SearchContext";

function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <BrowserRouter>
          <ThemeProvider>
            <Router />
          </ThemeProvider>
        </BrowserRouter>
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;
