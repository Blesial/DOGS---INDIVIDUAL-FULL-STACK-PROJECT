import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postRace, getTemperaments, fetchRaces } from "../actions";
import styles from './Form.module.css';
import {validate} from './validate';




export default function Form () {

    const dispatch = useDispatch();
    const [race, setRace] = useState({
        image: '',
        name: '',
        heightMin: '',
        heightMax: '',
        weightMin: '',
        weightMax: '',
        lifeSpanMin: '',
        lifeSpanMax: '',
        temperament: '',
        temperaments: []
    });
    console.log(race.temperaments)
    const [errors, setErrors] = useState({});


    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])

    const temperaments = useSelector(store => store.temperaments);
    
    const history = useHistory();
    console.log(race.temperament)
    function handleChange (e) {

        setRace({                      
            ...race,
            [e.target.name]: e.target.value
        })

        setErrors(validate({
          ...race,
          [e.target.name]: e.target.value
        }))
    }
  
    function handleDelete (e) {
        let setTemperament = race.temperaments.filter(
            (temperament) => temperament !== e.target.value
    );
        setRace({ ...race, temperaments: setTemperament });
     };
    

    const handleSelect = (e) => {
        let newTemperament = e.target.value;
        setRace({                      
          ...race,
          [e.target.name]: e.target.value
      })

      setErrors(validate({
        ...race,
        [e.target.name]: e.target.value
      }))

        if (race.temperaments.includes(newTemperament)) { return
        } else {
          let newTemperaments = [...race.temperaments, newTemperament];
          setRace({ ...race, temperaments: newTemperaments });
        }
      };
      
      function handleSubmit (e) {
        e.preventDefault();
        const error = validate(race);
        setErrors(error);
        if (Object.keys(errors).length === 0) {
          dispatch(postRace(race));
          setRace({
            name: "",
            heightMin: "",
            heightMax: "",
            weightMin: "",
            weightMax: "",
            lifeSpanMin: "",
            lifeSpanMax: "",
            temperament: "",
            temperaments: [],
          });
          setErrors({});
          dispatch(fetchRaces())
          history.push('/home');
          alert("Dog created successfully");
        } else {
          return;
        }
      };

    return (
        <body className={styles.body}>
            <div className={styles.container}>
                        <Link  to='/home'><button className={styles.btn }>Return</button></Link>
         <form onSubmit={handleSubmit}>
        <h1 className={styles.h1}>CREATE YOUR OWN RAZE:  </h1>
          <div className={styles.field}>  
            <div className={styles.form}>

            <label className={styles.label} htmlFor="name"><b>Name: </b></label>
            <input onChange={handleChange} name="name" type='text' value={race.name}/>
             {errors.name && <p className={styles.error}>{errors.name}</p>}
            </div>
            <br>
            </br>
            <div className={styles.form}>
            <label className={styles.label} htmlFor="height">Height: </label> 
            <input
               type="number"
               name="heightMin"
               placeholder="Min"
               value={race.heightMin}
               onChange={handleChange}
               className={styles.inputNumber}
               min={0}
             />
             <input
               type="number"
               name="heightMax"
               placeholder="Max"
               value={race.heightMax}
               onChange={handleChange}
               className={styles.inputNumber}
               min={0}
             />
             {errors.heightMin || errors.heightMax ? (
               <p className={styles.error}>
                 {errors.heightMin} <br /> {errors.heightMax}
               </p>
             ) : null}
            </div>
            <br>
            </br>
            <div className={styles.form}>
            <label className={styles.label} htmlFor="weight">Weight: </label>
            <input onChange={handleChange} 
            placeholder='Min' 
            name="weightMin"
            type='number'
             className={styles.inputNumber} 
             min={0} value={race.weightMin}/>
            <input
               type="number"
               name="weightMax"
               placeholder="Max"
               value={race.weightMax}
               onChange={handleChange}
               className={styles.inputNumber}
               min={0}
             />
              {errors.weightMin || errors.weightMax ? (
                <p className={styles.error}>{errors.weightMin} <br /> {errors.weightMax}</p>
              ) : null}
           </div>
            <br>
            </br>
            <div className={styles.form}>
            <label className={styles.label} htmlFor="life_Span">LifeSpan: </label>
            <input onChange={handleChange} 
            placeholder='Min' 
            name="lifeSpanMin"
            type='number'
             className={styles.inputNumber} 
             min={0} value={race.lifeSpanMin}/>
            <input
               type="number"
               name="lifeSpanMax"
               placeholder="Max"
               value={race.lifeSpanMax}
               onChange={handleChange}
               className={styles.inputNumber}
               min={0}
             />
              {errors.lifeSpanMin || errors.lifeSpanMax ? (
                <p className={styles.error}>{errors.lifeSpanMin} <br/> {errors.lifeSpanMax}</p>
              ) : null}
           </div>
     
            <hr>
            </hr>
       
            <label htmlFor="temperament"
            className={styles.inputTemperament}>
              <b>Temperaments:</b>
            </label>
            <select
            className={styles.but}
            id="temperament"
            name="temperament"
            value={race.temperament}
            onChange={(e) => handleSelect(e)}
              >
            <option value="">Select</option>
          {temperaments.map((temperament) => (
               <option
            key={temperament.id}
            value={temperament.name} >
             {temperament.name}
             </option>
        ))}
            </select>
            {errors.temperaments && (
            <p className={styles.error}>{errors.temperaments}</p>
        )}
          </div>
              <br>
              </br>
          <div>
          {race.temperaments.map((temperament) => (
            <button
           key={temperament}
          value={temperament}
          onClick={(e) => handleDelete(e)}
         className={styles.buttonTemperament}
             >
          {temperament}
          </button>
        ))}
        </div>
        <br>
        </br>
            <button
              className={styles.buttonn}
              type="submit"
              onClick={handleSubmit}
            >
              Create
            </button>
        </form>
        
            </div>
        </body>
    ) 
}
