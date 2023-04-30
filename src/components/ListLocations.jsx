import React, { useEffect, useState } from "react";
import { doc, getDocs, deleteDoc } from "firebase/firestore";
import { locationCollectionRef } from "../lib/firestore.collections";
import { db } from "../lib/init-firebase";

export default function ListLocations() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    getLocations();
  }, []);

  useEffect(() => {
    console.log(locations);
  }, [locations]);

  function getLocations() {
    console.log("getting locations");
    getDocs(locationCollectionRef)
      .then((response) => {
        const locs = response.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));
        setLocations(locs);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function deleteLocation(id) {
    const docRef = doc(db, 'locations', id)

    deleteDoc(docRef).then(()=> {
      console.log("document deleted")
    }).catch(error => console.log(error.message));
  }
  return (
    <div>
      <h4>List Locations</h4>
      <button onClick={() => getLocations()}>Refresh</button>
      <ul>
        {locations.map((location) => (
          <li key={location.id}>
            {location.id} : {location.data.title}
            <button onClick={() => deleteLocation(location.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
