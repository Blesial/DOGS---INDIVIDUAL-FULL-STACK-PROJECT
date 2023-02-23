const { Router } = require('express');
const axios = require('axios');
const {Race, Temperament} = require('../db'); 
const { Op } = require('sequelize');
const db = require('../db');
const router = Router();
require('dotenv').config();
const {DOG_API_KEY} = process.env; 

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
    return {
      id: race.id,
      name: race.name,
      image: race.image.url,
      weight: race.weight.imperial,
      temperaments: race.temperament
    }
  })
  let filteredDbRaces = dbRaces.map(race => {
    return {
      id: race.id,
      name: race.name,
      image: race.image ? race.image : race.img,
      weight: race.weight,
      createdInDataBase: race.createdInDataBase,
      temperaments: race.temperaments.map(temp => {
        return `${temp.name}, `

      })
    }
  })
  let arrayOfRaces = [...filteredApiRaces,...filteredDbRaces];
  if (arrayOfRaces.length < 1) return res.status(404).send('Dog Race could not be found')
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
     race.dataValues.temperaments = race.dataValues.temperaments.map(temp => temp.name);
        //  let a = race.dataValues.temperaments.map(temp => temp.name) // este codigo es pa convertir el array de temperaments a que este igual formato q los q traigo de la apizz
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
        height: elem.height.imperial,
        weight: elem.weight.imperial,
      }
     })

     return res.send(rsp)
    }
  } catch (err) {
    next(err)
  }
})


router.post('/', async (req, res, next) => {
    const {name, height, weight, life_span, createdInDataBase, temperaments, image} = req.body;
    try {
      const newRace = await Race.create({
        name,
        height,
        weight,
        life_span: life_span ? life_span : '10',
        createdInDataBase,
        image
        // ACA NO SE AGREGA EL TEMPERAMENTO PORQUE PARA ELLO HAY QUE HACER LA CONEXION. ACA NO VA. 
    });

    let temperamentDb = await Temperament.findAll({
      where: {
        name: temperaments
      }
    })

    await newRace.addTemperaments(temperamentDb)
    res.send('Race creation Successfull');

    } catch (err) {
      next(err)
    }
})

module.exports = router;

// ver de hacer validaciones tambien aca en el back. no solo en el front 