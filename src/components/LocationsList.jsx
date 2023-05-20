import React, { useState } from "react";
import "./styles/locations.css";

const LocationsList = ({ onCardClick, locations }) => {
  //const [locations] = useState(liveLocations);
  const [expanded, setExpanded] = useState(false);

  const handleSlide = () => {
    setExpanded(!expanded);
  };

  const handleCardClick = (locationId) => {
    // Pass the clicked location ID to the parent component
    onCardClick(locationId);
  };

  return (
    <div
      className={`realtime-locations-container ${expanded ? "expanded" : ""}`}
      onClick={handleSlide}
    >
      <ul>
        {locations.map((location) => (
          <li
            key={location.id}
            className={`location-card`}
            onClick={() => handleCardClick(location)}
          >
            {location.data.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LocationsList;
