import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postRace, getTemperaments } from "../actions";
import styles from './Form.module.css';




export default function Form () {

    const dispatch = useDispatch();

    const [race, setRace] = useState({
        image: '',
        name: '',
        height: '',
        weight: '',
        life_Span: '',
        temperaments: []
    });

    const [errors, setErrors] = useState({
        name: '',
        height: '',
        weight: '',
    });


    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])

    const temperaments = useSelector(store => store.temperaments);

    const history = useHistory();

    function handleChange (e) {

        setRace({                      
            ...race,
            [e.target.name]: e.target.value
        })

        setErrors(validate({
            ...race,
            [e.target.name]: e.target.value 
        }))

        console.log(race)
    }

    function handleSelect (e) {
        setRace({
            ...race,
            temperaments: [...race.temperaments , e.target.value]
        })
    }

    function handleSubmit (e) {
        e.preventDefault()
        dispatch(postRace(race))
        setRace({
            image: '',
            name: '',
            height: '',
            weight: '',
            life_Span: '',
            temperaments: []
        })
        history.push('/home')
        }  
    

    function validate (race) {
    let errors = {};
    race.weight > 200 ? errors.weight = 'Weight can not be more than 200 pounds' : errors.weight = '';

        race.name.length < 5 || race.name.length > 10 ? errors.name = 'Name must have between five and ten characters' : errors.name = '';
        race.height > 40 ? errors.height = 'Height must be under 40 inches from the shoulder' : errors.height = '';
        return errors;
    }
  
    function handleDelete (temp) {
        setRace({
            ...race,
            temperaments: race.temperaments.filter(race => race !== temp)
        })
    }


    // '12 - 20'.split('-')

    // (2) ['12 ', ' 20']

    // [0] cant be lesser than 12.. 
    // [1] cant be greater than 20

    // EN WEIGHT Y HEIGHT TENGO QUE DIFERENCIAR ENTRE PESO MINIMO Y MAXIMO Y LO MISMO PARA LA ALTURA. 
    return (
        <body className={styles.body}>
            <div className={styles.container}>
                        <Link  to='/home'><button className={styles.btn}>Cancel</button></Link>
         <form onSubmit={handleSubmit}>
        <h1 className={styles.h1}>CREATE YOUR OWN RAZE:  </h1>
          <div className={styles.form}>
            <div className={styles.field}>
            <label className={styles.label} htmlFor="image">Url: </label>
            <input onChange={handleChange} name="image" type='text  ' value={race.image}/>
            </div>  
            <br></br>
            <div className={styles.form}>
            <label className={styles.label} htmlFor="name">Nombre: </label>
            <input onChange={handleChange} name="name" type='text' value={race.name}/>
            <span>{errors.name}</span>
            </div>
            <br>
            </br>
            <div className={styles.form}>
            <label className={styles.label} htmlFor="height">Height: </label> 
            <input onChange={handleChange} name="height" type='number' value={race.height}/>
            <span>{errors.height}</span>
            </div>
            <br>
            </br>
            <div className={styles.form}>
            <label className={styles.label} htmlFor="weight">Weight: </label>
            <input onChange={handleChange} name="weight" type='number' value={race.weigth}/>
            <span>{errors.weight}</span>
           </div>
            <br>
            </br>
            <div className={styles.form}>
            <label className={styles.label}  htmlFor="life_Span">Life Span: </label>
            <input onChange={handleChange} name="life_Span" type='range' value={race.life_Span}/>
            <span>{errors.life_Span}</span>
            </div>
            
            <br>
            </br>
          <select className={styles.form} onChange={(e)=> handleSelect(e)} >
            {temperaments.map(temp => {
                return (
                    <option value={temp.name}>{temp.name}</option>
                )
            })}
          </select>
          <span>{errors.temperaments}</span>
          <input type='submit'/>
          </div>
        </form>
          <ul> Added temperaments until now:
            {
                race.temperaments.map(temp => {
                    return (
                        <div>
                            <br></br>
                    <button onClick={() => handleDelete(temp)}>x</button>
                        <p>{temp}</p>
                        </div>
                    )
                })
            }
            </ul>
            <br></br>
            <br></br>
            </div>
        </body>
    ) 
}
