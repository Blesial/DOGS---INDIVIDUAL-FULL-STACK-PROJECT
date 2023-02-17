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

// Required eager loading​

// When eager loading, we can force the query to return only records which have an associated model, effectively converting the query from the default OUTER JOIN to an INNER JOIN. This is done with the required: true option, as follows:

// User.findAll({
//   include: {
//     model: Task,
//     required: true
//   }
// });

// If you don't want anything from the junction table, you can explicitly provide an empty array to the attributes option inside the through option of the include option, and in this case nothing will be fetched and the extra property will not even be created:

// Foo.findOne({
//   include: {
//     model: Bar,
//     through: {
//       attributes: []
//     }
//   }
// });


router.get('/', async (req, res, next) => {
let {name} = req.query;
let dbRaces;
let apiRaces = await axios.get('https://api.thedogapi.com/v1/breeds');

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
  // .catch(error => {
  //   next(error);
  // }) 
// })

 


// [ ] GET /dogs/{idRaza}:
// Obtener el detalle de una raza de perro en particular
// Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
// Incluir los temperamentos asociados
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
     const response = await axios.get('https://api.thedogapi.com/v1/breeds')
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


// aca tmb tengo que incluirle los temperamentos. para que se suban a la base de datos ya con esa relacion. para q el get de arriba funcione
router.post('/', async (req, res, next) => {
  // creo q tambien deberia recibir temperaments. para poder relacionarlo con el dog. y luego en el get de arriba incluir los temperamentos.
    const {name, height, weight, life_span, createdInDataBase, temperaments, image} = req.body;
    try {
      const newRace = await Race.create({
        name,
        height,
        weight,
        life_span: life_span ? life_span : null,
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
    // newRace.addTemperaments(temperamentDb); // ver si funciona el set, sino usar el add. 
    res.send('Race creation Successfull');

    } catch (err) {
      next(err)
    }
})

module.exports = router;

// ver de hacer validaciones tambien aca en el back. no solo en el front 