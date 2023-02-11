const { Router } = require('express');
const axios = require('axios');
const {Race, Temperament} = require('../db'); 
const { Op } = require('sequelize');
const db = require('../db');
const router = Router();

// Ruta de detalle de raza de perro: debe contener

// [ ] Los campos mostrados en la ruta principal para cada raza (imagen, nombre y temperamento) arriba de esto me dice q tmb tiene q ir EL PESO
// PREGUNTAR
// [ ] Altura
// [ ] Peso
// [ ] Años de vida


router.get('/', async (req, res, next) => {
let {name} = req.query;
let apiRaces;
let dbRaces;
    if (name) {
      apiRaces = axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`);
      dbRaces = Race.findAll({
        where: {
          name: {
            [Op.iLike]: '%' + name + '%'
          },
        },
        order: [
          ['name', 'ASC']
        ]
      });
    
  } else {
    apiRaces =  axios.get('https://api.thedogapi.com/v1/breeds?limit=10&page=0'); //?limit=10&page=0
    dbRaces =  Race.findAll({
      include: Temperament
    });
  }

  
    Promise.all([apiRaces, dbRaces])
    .then((respuesta) => {
      const [api, db] = respuesta;
  let filteredApiRaces = api.data.map(race => { // PARA MOSTRAR LO QUE NOS INTERESA UNICAMENTE
    return {
      id: race.id,
      name: race.name,
      image: race.image ? race.image.url : race.image,
      weight: race.weight.imperial,
      temperaments: race.temperament
    }
  })
  let filteredDbRaces = db.map(race => {
    return {
      id: race.id,
      name: race.name,
      weight: race.weight,
    }
  })
  let arrayOfRaces = [...filteredApiRaces,...filteredDbRaces];
  if (arrayOfRaces.length < 1) return res.status(404).send('Dog Race could not be found')
  return res.status(200).send(arrayOfRaces);
    })
  .catch(error => {
    next(error);
  }) 
})

 


// [ ] GET /dogs/{idRaza}:
// Obtener el detalle de una raza de perro en particular
// Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
// Incluir los temperamentos asociados
router.get('/:idRaza', async (req, res, next) => {
  const {idRaza} = req.params;
  let race;
  try{
    if (idRaza.length > 5) {// es creado por mi 
      race = await Race.findByPk(idRaza, {
       // include: Temperaments
     });
   } else { // es de la api 
     const response = await axios.get('https://api.thedogapi.com/v1/breeds?limit=10&page=0')
     race = response.data
   }
     res.json(race);
  } catch (err) {
    next(err);
  }

})


// aca tmb tengo que incluirle los temperamentos. para que se suban a la base de datos ya con esa relacion. para q el get de arriba funcione
router.post('/', async (req, res, next) => {
  // creo q tambien deberia recibir temperaments. para poder relacionarlo con el dog. y luego en el get de arriba incluir los temperamentos.
    const {name, height, weight, age, createdInDataBase, temperaments} = req.body;
    try {
      const newRace = await Race.create({
        name,
        height,
        weight,
        age: age ? age : null,
        createdInDataBase
        // ACA NO SE AGREGA EL TEMPERAMENTO PORQUE PARA ELLO HAY QUE HACER LA CONEXION. ACA NO VA. 
    });

    let temperamentDb = await Temperament.findAll({
      where: {
        name: temperaments
      }
    })

    newRace.addTemperaments(temperamentDb); // ver si funciona el set, sino usar el add. 

    res.send('Race creation Successfull');

    } catch (err) {
      next(err)
    }
})

module.exports = router;

// ver de hacer validaciones tambien aca en el back. no solo en el front 