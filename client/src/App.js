import Home from './components/Home';
import {Route, Routes} from 'react-router-dom'
import Form from './components/Form';
import Landing from './components/Landing';
import Detail from './components/Detail';
import styles from './App.module.css';
import NotFound from './components/NotFound';
import Favorites from './components/Favorites';
// Switch es para cargar el contenido dinamico

function App() {
  return (
<div className={styles.App}>
  <Routes>
      <Route exact path='/add' element={<Form/>}/>
      <Route path='/home/:id' element={<Detail/>}/>
      <Route exact path='/home' element={<Home/>} />
      <Route exact path='/' element={<Landing/>}/>
        <Route exact path='/NotFound' element={<NotFound/>}/>
        <Route exact path='/favorites' element={<Favorites />} />
        <Route path='/*' element={<NotFound/>}/>
        </Routes>
      </div>
   
  );
}

export default App;
