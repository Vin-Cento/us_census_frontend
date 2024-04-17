import NavBar from "../components/NavBar.tsx";
import { useState, useRef } from "react";

import { Paper, Stack, Button, Autocomplete, TextField } from "@mui/material";
import { debounce } from "@mui/material/utils";

import { MapContainer, TileLayer, FeatureGroup, GeoJSON } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";
// @ts-expect-error POSSIBLE error
window.type = ""; // Doesn't matter what value to put here, just initialize the thing

import { stateOption } from "../contexts/selection.ts";

import axios from "axios";
import { fetchTract } from "../api/tract.ts";

function Map() {
  const center = [32.348141, -90.882462];

  const [featureCollection, setFeatureCollection] = useState(null);
  const georef = useRef(null);
  const toolref = useRef(null);

  const [tractOption, setTractOption] = useState([]);
  const [state, setState] = useState([]);
  const [tract, setTract] = useState([]);

  const handleDeletePolygon = () => {
    console.log(georef.current);
    if (toolref.current) {
      // @ts-expect-error POSSIBLE error
      toolref.current.eachLayer((layer: any) => {
        console.log(layer);
        console.log(layer._leaflet_id);
        // toolref.current.removeLayer(layer._leaflet_id)
      });
    }
  };

  const handleSearchTract = (e: any) => {
    const combinedState = state.join(",").replace(" ", "%20");
    fetchTract(e.target.value, combinedState).then((data: any) => {
      data ? setTractOption(data) : () => {};
    });
  };

  const handleOnChangeState = (_: any, value: any) => {
    setState(value.map((v: any) => v.toLowerCase()));
  };
  const handleOnChangeTract = (_: any, value: any) => {
    setTract(value);
  };

  const handleGetPolygon = () => {
    axios
      .post("http://localhost:1323/tract", {
        state: state,
        tract: tract,
      })
      .then((res) => {
        setFeatureCollection(res.data);
      })
      .catch((error) => {
        // Handle error
        if (error.response) {
          // The request was made and the server responded with a status code that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };

  return (
    <>
      <NavBar />
      <div className="float-right p-2 z-30">
        <Paper
          component="form"
          onSubmit={handleSearchTract}
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Stack spacing={2}>
            <Autocomplete
              multiple
              options={stateOption}
              style={{ paddingRight: 0 }}
              onChange={handleOnChangeState}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="State"
                  variant="outlined"
                  style={{ width: 300 }}
                />
              )}
              className="z-50"
            />
            <Autocomplete
              multiple
              options={tractOption}
              onChange={handleOnChangeTract}
              onKeyUp={debounce((e) => handleSearchTract(e), 1000)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tract"
                  variant="outlined"
                  style={{ width: 300 }}
                />
              )}
              className="z-50"
            />
            <Button
              variant="contained"
              onClick={handleGetPolygon}
              className="z-50"
            >
              Search
            </Button>

            <Button
              variant="contained"
              className="z-50"
              onClick={() => {
                console.log(JSON.stringify(featureCollection));
              }}
            >
              Get Polygon
            </Button>

            <Button
              variant="contained"
              className="z-50"
              onClick={handleDeletePolygon}
            >
              Remove Drawn Polygon
            </Button>
          </Stack>
        </Paper>
      </div>
      <MapContainer
        // @ts-expect-error POSSIBLE error
        center={center}
        zoom={8}
        style={{ width: "100%", height: "94vh" }}
        className="absolute float z-0"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <FeatureGroup ref={toolref}>
          <EditControl
            position="topleft"
            draw={{
              circlemarker: false,
              rectangle: true,
              circle: false,
              marker: false,
              polyline: false,
            }}
            edit={{
              edit: false,
            }}
          />
        </FeatureGroup>

        <GeoJSON
          key={JSON.stringify(featureCollection)}
          data={featureCollection}
          ref={georef}
        />
      </MapContainer>
    </>
  );
}

export default Map;
