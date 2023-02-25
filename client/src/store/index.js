import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducer";
import thunk from "redux-thunk";

//Intalar extencion de redux.
const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;


//POR SI VUELVE A PASAR EL ERROR DE PROCESS
window.process = { ...window.process } 


// PARA PODER HACER ACCIONES ASINCRONAS CON PROMESAS. ES COMO UN INTERMEDIARIO QUE AL DESPACHAR UNA ACCION, HACE QUE ESPERE Y RECIEN UNA VEZ CUMPLIDA, AHI SE LA ENTREGA AL STORE.
// SIN EL THUNK, LA ACTION DESPACHADA ENVIARIA UNDEFINED AL STORE, Y EL STORE DE LA MISMA MANERA, LE AVISARIA AL REDUCER SOBRE ESTA ACTION QUE ES UNDEFINED. 
// Objeto que mantiene el arbol de estado de la aplicacion
const store = createStore(
  rootReducer, // recibe una accion como argumento y retorna un objeto con el estado
  composeEnhancers(applyMiddleware(thunk))
);

export default store;











