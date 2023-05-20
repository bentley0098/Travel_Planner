import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import pinIcon from "../img/pin.png";


// Define a custom icon for the marker
const markerIcon = new L.Icon({
  iconUrl: pinIcon,
  iconSize: [28],
});

export default function MapMarkers(locations) {
  console.log(locations.locations);

  return (
    <>
      { 
      locations.locations.map((location) => (
        <Marker position={location.data.position} icon={markerIcon} key={location.id}>
          <Popup>{location.data.title}</Popup>
        </Marker>
      ))
      }
    </>
  );
}

