import React, { useState, useEffect } from "react";
import { Alert, Box, Container, Stack } from "@mui/material";
import MovieFilter from "../components/MovieFilter";
import MovieSearch from "../components/MovieSearch";
import MovieList from "../components/MovieList";
import { FormProvider } from "../components/form";
import { useForm } from "react-hook-form";
import apiService from "../app/apiService";
import { API_KEY } from "../app/config";
import orderBy from "lodash/orderBy";
import LoadingScreen from "../components/LoadingScreen";
import Grid from "@mui/material/Grid";
import Category from "../components/Category";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cutInitial, setcutInitial] = useState();

  const defaultValues = {
    gender: [],
    category: "All",
    priceRange: "",
    sortBy: "featured",
    searchQuery: "",
  };
  const methods = useForm({
    defaultValues,
  });
  const { watch, reset } = methods;
  const filters = watch();
  const filterProducts = applyFilter(products, filters);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await apiService.get(
          `/trending/all/day?api_key=${API_KEY}`
        );
        const result = res.data.results;
        setProducts(result);
        setcutInitial([...result].splice(16, 4));
        setError("");
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    };
    getData();
  }, []);

  return (
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
          <MovieList
            products={filterProducts}
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

  //   return (
  //     <Container sx={{ display: "flex", minHeight: "100vh", mt: 3 }}>
  //       {/* <Stack>
  //         <FormProvider methods={methods}>
  //           <MovieFilter resetFilter={() => reset()} />
  //         </FormProvider>
  //       </Stack> */}
  //       <Stack sx={{ flexGrow: 1 }}>
  //         <FormProvider methods={methods}>
  //           <Stack
  //             spacing={2}
  //             direction={{ xs: "column", sm: "row" }}
  //             alignItems={{ sm: "center" }}
  //             justifyContent="space-between"
  //             mb={2}
  //           >
  //             <MovieSearch />
  //           </Stack>
  //         </FormProvider>
  //         <Box sx={{ position: "relative", height: 1 }}>
  //           {loading ? (
  //             <LoadingScreen />
  //           ) : (
  //             <>
  //               {error ? (
  //                 <Alert severity="error">{error}</Alert>
  //               ) : (
  //                 <MovieList products={filterProducts} />
  //               )}
  //             </>
  //           )}
  //         </Box>
  //       </Stack>
  //     </Container>
  //   );
  // }

  function applyFilter(products, filters) {
    const { sortBy } = filters;
    let filteredProducts = products;

    //   // SORT BY
    if (sortBy === "featured") {
      filteredProducts = orderBy(products, ["sold"], ["desc"]);
    }
    if (sortBy === "newest") {
      filteredProducts = orderBy(products, ["createdAt"], ["desc"]);
    }
    if (sortBy === "priceDesc") {
      filteredProducts = orderBy(products, ["price"], ["desc"]);
    }
    if (sortBy === "priceAsc") {
      filteredProducts = orderBy(products, ["price"], ["asc"]);
    }

    //   // FILTER PRODUCTS
    if (filters.gender.length > 0) {
      filteredProducts = products.filter((product) =>
        filters.gender.includes(product.gender)
      );
    }
    if (filters.category !== "All") {
      filteredProducts = products.filter(
        (product) => product.category === filters.category
      );
    }
    if (filters.priceRange) {
      filteredProducts = products.filter((product) => {
        if (filters.priceRange === "below") {
          return product.price < 25;
        }
        if (filters.priceRange === "between") {
          return product.price >= 25 && product.price <= 75;
        }
        return product.price > 75;
      });
    }
    if (filters.searchQuery) {
      filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }
    return filteredProducts;
  }
}

export default HomePage;
