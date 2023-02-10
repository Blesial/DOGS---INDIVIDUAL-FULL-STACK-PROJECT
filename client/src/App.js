import './App.css';
import OrderRaces from './components/orderRaces';
import Races from './components/races';
import SearchBar from './components/searchBar';

function App() {
  return (
    <div className="App">
      <SearchBar/>
      <OrderRaces/>
    <hr></hr>
      <Races/>
    </div>
  );
} 


export default App;
