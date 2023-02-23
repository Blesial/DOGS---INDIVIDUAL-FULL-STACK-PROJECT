import Home from './components/Home';
import {Route, Switch} from 'react-router-dom'
import Form from './components/Form';
import Landing from './components/Landing';
import Detail from './components/Detail';
import styles from './App.module.css';
// Switch es para cargar el contenido dinamico

function App() {
  return (
<div className={styles.App}>
      <Switch>
      <Route path='/add'>
        <Form/>
      </Route>
      <Route path='/home/:id' >
      <Detail/>
      </Route>
      <Route path='/home'>
      <Home/>
      </Route>
        <Route exact path='/'>
          <Landing/>
        </Route>
        <Route path='/*'>
      404 NOT FOUND . HACER PAGINA DE ERROR! 
        </Route>
      </Switch>
      </div>
   
  );
} 

export default App;
