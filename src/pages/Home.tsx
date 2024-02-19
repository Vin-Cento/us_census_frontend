import NavBar from "../components/NavBar.tsx";
import { Container, Box, Typography } from "@mui/material";

function Home() {
  return (
    <>
      <NavBar />
      <Container maxWidth="xl">
        <Box padding={2}>
          <Typography justifyContent="center" display="flex" padding={3} variant="h4">
            US Census Tract Finder
          </Typography>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Box>
      </Container>
    </>
  );
}

export default Home;
