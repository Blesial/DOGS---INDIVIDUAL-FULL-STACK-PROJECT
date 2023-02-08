const { Router } = require('express');
const axios = require('axios');
const {Race, Temperaments} = require('../db'); 
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
let name = req.query.name;
let apiRaces;
let dbRaces;
// tengo q solucionar esto 
    if (name) {
      apiRaces =  axios.get(` https://api.thedogapi.com/v1/breeds/search?q=${name}`);
      dbRaces =  Race.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`
          },
        },
        order: [
          ['name', 'ASC']
        ]
      });
  } else {
    apiRaces =  axios.get('https://api.thedogapi.com/v1/breeds?limit=10&page=0');
    dbRaces =  Race.findAll();
  }
  Promise.all([apiRaces, dbRaces])
    .then((respuesta) => {
      const [api, db] = respuesta;
  let filteredApiRaces = api.data.map(race => { // PARA MOSTRAR LO QUE NOS INTERESA UNICAMENTE
    return {
      id: race.id,
      name: race.name,
      image: race.image.url,
      weight: race.weight.imperial,
      temperaments: race.temperament
    }
  })
  let filteredDbRaces = db.map(race => {
    return {
      id: race.id,
      name: race.name,
      weight: race.weight
    }
  })
  let arrayOfRaces = [...filteredApiRaces,...filteredDbRaces];
  res.send(arrayOfRaces);
    })
})
    // if (!dbDogsRaces) {
    //   return res.status(404).send('That Dog Race doesnt exists')
    // } else {
    //   return res.send(dogs);
    //         }
 


// [ ] GET /dogs/{idRaza}:
// Obtener el detalle de una raza de perro en particular
// Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
// Incluir los temperamentos asociados
router.get('/:idRaza', async (req, res, next) => {
  const {idRaza} = req.params;
  try {
    const race = await Race.findByPk(idRaza, {
      include: Temperaments
    });
    res.json(race)
  } catch (err) {
    next(err);
  }
})


// aca tmb tengo que incluirle los temperamentos. para que se suban a la base de datos ya con esa relacion. para q el get de arriba funcione
router.post('/', async (req, res, next) => {
  // creo q tambien deberia recibir temperaments. para poder relacionarlo con el dog. y luego en el get de arriba incluir los temperamentos.
    const {name, height, weight, age, temperamentid} = req.body;
    try {
      const newDog = await Race.create({
        name,
        height,
        weight,
        age: age ? age : null
    })
    // await newDog.setTemperaments([temperamentid])
    res.status(201).send(newDog);
    } catch (err) {
      next(err)
    }
})

module.exports = router;