import Home from './components/Home';
import {Route, Switch} from 'react-router-dom'
import Form from './components/Form';
import Landing from './components/Landing';
import Detail from './components/Detail';
import styles from './App.module.css';
import NotFound from './components/NotFound';
// Switch es para cargar el contenido dinamico

function App() {
  return (
<div className={styles.App}>
      <Switch>
      <Route exact path='/add'>
        <Form/>
      </Route>
      <Route path='/home/:id' >
      <Detail/>
      </Route>
      <Route exact path='/home'>
      <Home/>
      </Route>
        <Route exact path='/'>
          <Landing/>
        </Route>
        <Route exact path='/NotFound'>
    <NotFound/>
        </Route>
        <Route path='/*'>
      <NotFound/>
        </Route>
      </Switch>
      </div>
   
  );
} 

export default App;
