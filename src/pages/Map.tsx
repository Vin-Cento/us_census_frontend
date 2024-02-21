import NavBar from "../components/NavBar.tsx";
import { useState, useMemo } from "react";

import { Paper, Stack, Button, Autocomplete, TextField } from "@mui/material";
import { debounce } from "@mui/material/utils";

import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

import axios from "axios";

function Map() {
  const stateOption = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];
  const center = [32.348141, -90.882462];
  const [drawnPolygonCoords, setDrawnPolygonCoords] = useState([]);
  const [geoJson, setGeoJson] = useState({});
  const [tractOption, setTractOption] = useState([]);
  const [state, setState] = useState([]);
  const [tract, setTract] = useState([]);

  const handleDrawnPolygon = (e: any) => {
    const newCoords = e.layer._latlngs[0].map((coord: any) => [
      coord.lat,
      coord.lng,
    ]);
    setDrawnPolygonCoords(newCoords);
  };

  const handleSearchTract = (e: any) => {
    const conbinedState = state.join(",").replace(" ", "%20");
    console.log(conbinedState);
    if (conbinedState == "") {
      axios
        .get(`http://localhost:1323/tract?tract=${e.target.value}`)
        .then((res) => {
          setTractOption(res.data);
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
    } else {
      console.log(
        `http://localhost:1323/tract?tract=${e.target.value}&state=${conbinedState}`,
      );
      axios
        .get(
          `http://localhost:1323/tract?tract=${e.target.value}&state=${conbinedState}`,
        )
        .then((res) => {
          setTractOption(res.data);
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
    }
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
        setGeoJson(res.data);
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
              onSelect={handleSearchTract}
              onKeyUp={debounce((e) => handleSearchTract(e), 500)}
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
              onClick={() => console.log(geoJson)}
              className="z-50"
            >
              Get Polygon
            </Button>
          </Stack>
        </Paper>
      </div>
      <MapContainer
        center={center}
        zoom={13}
        style={{ width: "100%", height: "94vh" }}
        className="absolute float z-0"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <FeatureGroup>
          <EditControl
            position="topleft"
            onCreated={handleDrawnPolygon}
            draw={{
              circlemarker: false,
              rectangle: false,
              circle: false,
              marker: false,
              polyline: false,
            }}
          />
        </FeatureGroup>
      </MapContainer>
    </>
  );
}

export default Map;
