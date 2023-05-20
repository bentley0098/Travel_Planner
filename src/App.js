import "./App.css";
//import AddLocation from './components/AddLocation';
//import EditLocation from './components/EditLocation';
//import ListLocations from './components/ListLocations';
import LocationsList from './components/LocationsList';
import Map from "./components/Map";
import { useState, useEffect } from 'react';
import { onSnapshot } from "@firebase/firestore";
import { locationCollectionRef } from "./lib/firestore.collections";

function App() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

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

  const handleCardClick = (location) => {
    // Update the selectedLocation state with the clicked location ID
    setSelectedLocation(location);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Travel Plans</h1>
      </header>
      <main>
        {/*  Firebase connection and handler components :
        <ListLocations/>
        <RealtimeLocations/>
        <AddLocation/> 
        <EditLocation/>
        */}

        <Map selectedLocation={selectedLocation?.data.position} locations={locations}/>

        <LocationsList onCardClick={handleCardClick} locations={locations} />
      </main>
    </div>
  );
}

export default App;
