import NavBar from "../components/NavBar.tsx";
import { Fab, Container, Box, Typography } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import HomeIcon from "@mui/icons-material/Home";
import "leaflet/dist/leaflet.css";

function Map() {
  const center = [51.505, -0.09];
  return (
    <>
      <NavBar />
      <Fab color="primary" aria-label="add">
        <HomeIcon />
      </Fab>
      <div className="map-container">
        <MapContainer
          center={center}
          zoom={13}
          style={{ width: "100%", height: "94vh" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </>
  );
}

export default Map;
