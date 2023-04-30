import './App.css';
//import AddLocation from './components/AddLocation';
//import EditLocation from './components/EditLocation';
//import ListLocations from './components/ListLocations';
//import RealtimeLocations from './components/RealtimeLocations';
import Map from './components/Map';


function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Travel App</h1>
      </header>
      <main>
        {/*  Firebase connection and handler components :
        <ListLocations/>
        <RealtimeLocations/>
        <AddLocation/> 
        <EditLocation/>
        */}

        <Map />

      </main>
    </div>
  );
}

export default App;
