import './App.css';
import OrderRaces from './components/orderRaces';
import Races from './components/races';
import SearchBar from './components/searchBar';
import {Route, Switch, Link} from 'react-router-dom'
import AddRace from './components/addRace';
// Switch es para cargar el contenido dinamico

function App() {
  return (
<>
<nav>
</nav>
      <Switch>
      <Route path='/add'>
        <AddRace/>
      </Route>
      <Route path='/home'>
        <SearchBar/>
      <OrderRaces/>
      <Races/>
      </Route>
        <Route path='/' exact>
        <button> <Link to='/home'><b>Enter App</b></Link> </button> 
        </Route>
      </Switch>
    </>
  );
} 

// return (
 

//   <div className='App' style={{ padding: '25px' }}>  
// <div>
// {location.pathname !== '/' && <Nav onSearch={onSearch} onRandom={onRandom}
//    style={{
//     display:'flex',
//     alignContent: 'end'
//   }} 
//   />}
// </div>

//   <Routes>
//     <Route path='/' element={<Form login={login}/>}/>
//     <Route path='/home' element= {<Cards personajes={personajes} onClose={onClose} />}/>
//     <Route path='/favorites' element={<Favorites/>}/>
//     <Route path='/detail/:detailId' element={<Detail/>} />
//     <Route path='/about' element={<About/>} />
//   </Routes>

//   </div>
export default App;
