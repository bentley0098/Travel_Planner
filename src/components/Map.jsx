import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Popup,
} from "react-leaflet";
import "./styles/map.css";
import MapMarkers from "./MapMarkers";
import { TiPlus } from "react-icons/ti";
import L from "leaflet";
import pinIcon from "../img/pin.png";
import AddLocation from "./AddLocation";

const markerIcon = new L.Icon({
  iconUrl: pinIcon,
  iconSize: [28],
});

export default function MainMap({ selectedLocation, locations }) {
  const [isListeningForClicks, setIsListeningForClicks] = useState(false);
  const [clickedLocation, setClickedLocation] = useState(null);
  const mapRef = useRef(null);

  console.log(locations);

  function handleStartClicking() {
    setIsListeningForClicks(true);

    // To style button and show toast after it is clicked
    var addLocationBtn = document.querySelector(".addButton");
    var addLocToast = document.querySelector(".addLoc__toast");
    var addLocContainer = document.querySelector(".addLoc__container");

    addLocationBtn.classList.add("clicked");
    setTimeout(function () {
      addLocationBtn.classList.remove("clicked");
    }, 350);

    addLocToast.classList.add("show");
    addLocContainer.classList.add("show");
  }

  function handleMapClick(event) {
    setClickedLocation(event.latlng);
  }

  useEffect(() => {
    // Get the map instance
    const map = mapRef.current;
    console.log(selectedLocation);
    // Update the map center
    if (map && selectedLocation) {
      map.setView(selectedLocation, map.getZoom());
    }
  }, [selectedLocation]);

  function handleReset() {
    console.log("RESET");
    setIsListeningForClicks(false);
    setClickedLocation(null);
  }

  return (
    <div className="map__container">
      <div className="addLoc__toast">
        <span className="addLoc__toastText">
          Click the map to add a new location
        </span>
      </div>
      <MapContainer
        key={selectedLocation?.toString()}
        center={selectedLocation || [-33.865143, 151.2099]}
        zoom={11}
        scrollWheelZoom={false}
        className="leaflet__mapContainer"
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
        }}
      >
        <TileLayer
          attribution='© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>'
          url="https://api.mapbox.com/styles/v1/bentley0098/clgrg3iyl000a01r5722ybj3l/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYmVudGxleTAwOTgiLCJhIjoiY2xncmc3cDg4MDZoMDNucWlxc2d0YjVhZyJ9.Y_VfcMoqiyREg2M_bQhQ2w"
        />

        <MapMarkers locations={locations}/>

        {/* Register a click event listener if isListeningForClicks is true */}
        {isListeningForClicks && <MapClickHandler onClick={handleMapClick} />}

        {/* Display the clicked location */}
        {clickedLocation && (
          <Marker position={clickedLocation} icon={markerIcon}>
            <Popup>
              Latitude: {clickedLocation.lat.toFixed(5)}, Longitude:{" "}
              {clickedLocation.lng.toFixed(5)}
            </Popup>
          </Marker>
        )}
      </MapContainer>

      <button className="addButton" onClick={handleStartClicking}>
        <TiPlus />
      </button>

      <AddLocation location={clickedLocation} onSubmit={() => handleReset()} />
    </div>
  );
}

function MapClickHandler({ onClick }) {
  useMapEvents({
    click(event) {
      onClick(event);
    },
  });
  return null;
}
