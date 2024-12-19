import { Outlet } from "react-router-dom";
import { Box, Container, Stack } from "@mui/material";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";

function MainLayout({ onResults }) {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <MainHeader onResults={onResults} />
      <Container>
        <Outlet />
      </Container>

      <Box sx={{ flexGrow: 1 }} />

      <MainFooter />
    </Stack>
  );
}

export default MainLayout;
