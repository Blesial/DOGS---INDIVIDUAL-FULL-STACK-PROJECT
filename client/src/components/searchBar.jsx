import { useState} from "react";
import { useDispatch } from "react-redux";
import { searchRaces } from "../actions";
import styles from './searchBar.module.css';
import {useNavigate} from 'react-router-dom';


export default function SearchBar ({setCurrentPage}) {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

// LA LOGICA EN ESTE CASO ESTA HECHA EN EL BACK END - (SEARCH BY NAME)

    function handleInputChange(e){
        dispatch(searchRaces(e));
        setCurrentPage(1);
        navigate("/home");
    }

    return (
        // Formulario Controlado: Que los elementos del formulario esten gestionados por el estado del componente
        <div className={styles.group}> 
                <input className={styles.input} type='text' placeholder="Search Dog..." onChange={(e)=> {
                    setSearch(e.target.value)
                    handleInputChange(e.target.value)
                }} value={search}></input>
                <input type='submit' value='Search'></input>
        </div>
    )
}


