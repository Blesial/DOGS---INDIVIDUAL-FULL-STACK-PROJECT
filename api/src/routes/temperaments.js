const { default: axios } = require('axios');
const { Router } = require('express');
const {Temperament} = require('../db');
const router = Router();


router.get('/', async (req, res, next) => { // /temperaments: el arreglo de la api esta bastante feo 
// DATO: LA FUNCION FLAT() PUEDE FACILITAR MUCHO ALGO DEL CODIGO YA QUE JUNTA EN UN MISMO ARRAY SIN IMPORTAR LA PROFUNDIDAD DE ANIDACIONES QUE HAYA DENTRO. 
// OSEA QUITA LAS ANIDACIONES DE SUB ARREGLOS SIN IMPORTAR LA PROFUNDIDAD (HAY QUE INDICARLA SI LA PROFUNDIDAD ES MAYOR a 1)
  try {
  let apiRaces = await axios.get('https://api.thedogapi.com/v1/breeds?limit=50');

  const apiTemperaments = apiRaces.data.map(race => {
     return race.temperament.split(',')
  });

 var mergedTemperamentsArray = [].concat.apply([], apiTemperaments); // el array of arrays los paso a un solo array. 

 const TemperamentsWithOutTrims = mergedTemperamentsArray.map((string) => {
   return string.trim();
 })

let temperamentsArrayWithOutRepetitions = new Set(TemperamentsWithOutTrims);
let finalTemperamentsArray = Array.from(temperamentsArrayWithOutRepetitions)// aca obtengon un array con todos los temperamentos sin repetir . 

finalTemperamentsArray.forEach(e => { // esto hace que guarde en la base de datos el arreglo que arme de todos los temperamentos. y 
  // usamos findorcreate para que una vez que cambiemos el force: a false en db.js . no cree todo el tiempo copias repetidas, sino 1 sola copia. 
  Temperament.findOrCreate({
      where: {
        name: e
      }
  })
})

const temperamentsFromDb = await Temperament.findAll(); // para traerlos desde la base de datos. 
res.send(temperamentsFromDb)

} catch (err) {
  next(err)
}
  })
  
  

module.exports = router;




