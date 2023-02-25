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
     return race.temperament?.split(', ')
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




const temperaments = async () => {
  try {
    let api = await axios.get(
      `https://api.thedogapi.com/v1/breeds`
    );
    let data = api.data.map((item) =>
      item.temperament ? item.temperament.split(", ") : []
    );

    let temperamentArray = [];

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        if (temperamentArray.indexOf(data[i][j]) === -1) {
          temperamentArray.push(data[i][j]);
        }
      }
    }
    return temperamentArray.sort();
  } catch (error) {
    return error.message;
  }
};
router.get("/temperaments", async (req, res) => {
  try {
    const data = await temperaments();
    data.forEach((el) => {
      Temperament.findOrCreate({
        where: { name: el },
      });
    });
    const allTemperaments = await Temperament.findAll();
    res.status(200).json(allTemperaments);
  } catch (error) {
    res.status(500).json(error.message);
  }
});
