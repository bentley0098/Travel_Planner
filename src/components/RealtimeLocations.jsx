import React, { useEffect, useState } from "react";
import { onSnapshot } from "@firebase/firestore";
import { locationCollectionRef } from "../lib/firestore.collections";

export default function RealtimeLocations() {
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
    <div>
      <h4>RealtimeLocations</h4>

      <ul>
        {locations.map((location) => (
          <li key={location.id}>
            {location.id} : {location.data.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
