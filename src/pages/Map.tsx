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
  const [tractOption, setTractOption] = useState([
    "970700",
    "975902",
    "001600",
    "966100",
    "001000",
  ]);
  const [state, setState] = useState([]);
  const [tract, setTract] = useState([]);

  const handleDrawnPolygon = (e: any) => {
    const newCoords = e.layer._latlngs[0].map((coord: any) => [
      coord.lat,
      coord.lng,
    ]);
    setDrawnPolygonCoords(newCoords);
  };

  const handleSearch = (e: any) => {
    console.log(e.target.value);
    axios
      .get(`http://localhost:1323/tract?tractce=${e.target.value}`)
      .then((res) => {
        setTractOption(res.data);
      });
  };

  const handleOnChangeState = (_: any, value: any) => {
    setState(value.map((v: any) => v.toLowerCase()));
  };
  const handleOnChangeTract = (_: any, value: any) => {
    setTract(value);
  }

  const handleGetPolygon = () => {
    axios
      .post("http://localhost:1323/tract", {
        state: state,
        tract: tract,
      })
      .then((res) => {
        console.log(res.data);
      });
  };
  return (
    <>
      <NavBar />
      <div className="float-right p-2 z-30">
        <Paper
          component="form"
          onSubmit={handleSearch}
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
              onKeyUp={debounce((e) => handleSearch(e), 500)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tract"
                  variant="outlined"
                  style={{ width: 300 }}
                // InputProps={{
                //   ...params.InputProps,
                //   endAdornment: <SearchIcon />,
                // }}
                />
              )}
              className="z-50"
            />
            <Button variant="contained" onClick={handleGetPolygon} className="z-50">
              Search
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
