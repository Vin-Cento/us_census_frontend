import NavBar from "../components/NavBar.tsx";
import {
  Stack,
  Container,
  Button,
  Box,
  Typography,
  TextField,
} from "@mui/material";
import { useState, useRef } from "react";

function Test() {
  const [repeat, setRepeat] = useState(null);
  const refdata = useRef(1);
  const ele = useRef(null);
  const handleClick = (e) => {
    setRepeat(e);
    console.log("Test");
    refdata.current += 1;
    ele.current.innerHTML = "hello world"
    // console log all attributes of the element
    console.log(ele.current.attributes)
    // attach event to the element
    ele.current.addEventListener('click', () => {
      console.log('clicked')
    })
    console.log(ele.current)
  };
  const handleRepeat = (e) => {
    console.log(repeat);
  };
  return (
    <>
      <NavBar />
      <Container maxWidth="xl">
        <Box padding={2}>
          <Typography
            justifyContent="center"
            display="flex"
            padding={3}
            variant="h4"
          >
            Test
          </Typography>
          <Typography
            justifyContent="center"
            display="flex"
            padding={3}
            variant="h6"
          >
            {refdata.current}
          </Typography>

          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            onKeyDown={handleClick}
            className="bg-gray-300"
          />

          <Container maxWidth="xs">
            <Stack padding={8}>
              <Button variant="contained" onClick={handleRepeat}>
                Repeat
              </Button>
              <Button variant="contained" onClick={handleClick}>
                Test
              </Button>
              <p ref={ele}>asdf</p>
              <Button variant="contained">custom event</Button>
            </Stack>
          </Container>
        </Box>
      </Container>
    </>
  );
}

export default Test;
