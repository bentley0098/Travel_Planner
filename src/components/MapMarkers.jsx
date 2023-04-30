import React, { useState, useEffect } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import pinIcon from "../img/pin.png";
import { onSnapshot } from "@firebase/firestore";
import { locationCollectionRef } from "../lib/firestore.collections";

// Define a custom icon for the marker
const markerIcon = new L.Icon({
  iconUrl: pinIcon,
  iconSize: [28],
});

export default function MapMarkers() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(locationCollectionRef, (snapshot) => {
      setLocations(
        snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
      );
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      {locations.map((location) => (
        <Marker position={location.data.position} icon={markerIcon} key={location.id}>
          <Popup>{location.data.title}</Popup>
        </Marker>
      ))}
    </>
  );
}
