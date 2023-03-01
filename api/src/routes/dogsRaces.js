const { Router } = require('express');
const axios = require('axios');
const {Race, Temperament} = require('../db'); 
const { Op } = require('sequelize');
const db = require('../db');
const router = Router();
require('dotenv').config();
const {DOG_API_KEY} = process.env; 
const validate = require('./validate')

const apiLink = `https://api.thedogapi.com/v1/breeds?api_key=${DOG_API_KEY}`


router.get('/', async (req, res, next) => {


let {name} = req.query;
let dbRaces;
let apiRaces = await axios.get(apiLink);
    if (name) {

      apiRaces = apiRaces.data.filter(e => e.name.toUpperCase().includes(name.toUpperCase()))  

      dbRaces = await Race.findAll({
        where: {
          name: {
            [Op.iLike]: '%' + name + '%'
          },
        },
        order: [
          ['name', 'ASC']
        ],
        include: {
          model: Temperament,
          attributes: ['name'],
          through: {
            attributes: [],
          }
        }
      });
    
  } else {
    apiRaces = apiRaces.data
    dbRaces = await Race.findAll({
      include: {
        model: Temperament,
        attributes: ['name'],
        through: {
          attributes: [],
        }
      }
    });

  }

  let filteredApiRaces = apiRaces.map(race => { // PARA MOSTRAR LO QUE NOS INTERESA UNICAMENTE
    const weightArray = +race.weight.metric > 0
      ? +race.weight.metric
      : race.weight.metric.split(" - ").length > 1
      ? race.weight.metric.split(" - ")
      : 0;
    return {
      id: race.id,
      name: race.name,
      image: race.image.url,
      weight: race.weight.metric,
      temperaments: race.temperament,
      weightMin:
      typeof weightArray === "number"
        ? weightArray
        : weightArray === 0
        ? 0
        : +weightArray[0],
    weightMax:
      typeof weightArray === "number"
        ? weightArray
        : weightArray === 0
        ? 0
        : +weightArray[1],
    }
  })
  let filteredDbRaces = dbRaces.map(race => {
    const weightArray = race.weight.split(" - "); // ACA TRAEMOS DE LA BASE DE DATOS EL PERRO CREADO CON EL POST 
    
    return {
      id: race.id,
      name: race.name,
      image: race.image,
      weight: race.weight,
      weightMin: +weightArray[0],
      weightMax: +weightArray[1],
      createdInDataBase: race.createdInDataBase,
      temperaments: race.temperaments.map(temp => {
        return `${temp.name}`

      })
    }
  })
  let arrayOfRaces = [...filteredApiRaces,...filteredDbRaces];
  if (arrayOfRaces.length < 1) return res.send([])
  return res.status(200).send(arrayOfRaces);
    })


router.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    let race;
      if (id.length > 10) {// es creado por mi 
      race = await Race.findByPk(id, {
       include: {
        model: Temperament,
        attributes: ['name'],
        through: {
          attributes: [],
        }
       }
     });
     race.dataValues.temperaments = race.dataValues?.temperaments?.map(temp => temp.name);
        //  let a = race.dataValues.temperaments.map(temp => temp.name) // este codigo es pa convertir el array de temperaments a que este igual formato q los q traigo de la api
     return res.send(race.dataValues);

   } else { // es de la api 
     const response = await axios.get(apiLink)
     let unique = response.data.filter(elem => elem.id === Number(id));
     let rsp = unique.map(elem => {
      return {
        id: elem.id,
        image: elem.image.url,
        name: elem.name,
        age: elem.life_span,
        temperaments: elem.temperament.split(' , '), // ver si conviene asi o solo split(' ')
        height: elem.height.metric,
        weight: elem.weight.metric,
      }
     })

     return res.send(rsp)
    }
  } catch (err) {
    next(err)
  }
})


router.post('/', async (req, res, next) => { // ACA SE CARGA EN LA BASE DE DATOS EL PERRO. DE LA FORMA Q SE NOS CANTE
    const {name, heightMin, heightMax, weightMin, weightMax, lifeSpanMin, lifeSpanMax, createdInDataBase, temperaments} = req.body;
    try {
      console.log(temperaments)
      const validator = validate(req.body);
      if (Object.keys(validator).length > 0) {
        return res.status(400).json(validator);
      } else {

      const newRace = await Race.create({
        name,
        height: `${heightMin} - ${heightMax}`,
        weight: `${weightMin} - ${weightMax}`,
        lifeSpan: `${lifeSpanMin} - ${lifeSpanMax}`,
        createdInDataBase,
        // ACA NO SE AGREGA EL TEMPERAMENTO PORQUE PARA ELLO HAY QUE HACER LA CONEXION. 
    });

    let temperamentDb = await Temperament.findAll({
      where: {
        name: temperaments
      }
    })

    await newRace.addTemperaments(temperamentDb)
   return res.send('Race creation Successfull');
 }
    } catch (err) {
      next(err)
    }
})

  router.delete('/delete/:id', async (req, res, next) => {
    const {id} = req.params;
    try {
        const dog = await Race.findByPk(id);
        if(!dog){
            res.status(404).send("Can't delete");
        } else {
            await dog.destroy();
            res.status(200).send("The Dog has been deleted");
        }
    } catch (error) {
        next(error);
    }
})


module.exports = router;

// ver de hacer validaciones tambien aca en el back. no solo en el front 

