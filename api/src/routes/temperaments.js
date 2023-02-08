const { default: axios } = require('axios');
const { Router } = require('express');
const {Temperament} = require('../db');
const router = Router();


router.get('/', async (req, res, next) => { // /temperaments/

  let apiRaces = await axios.get('https://api.thedogapi.com/v1/breeds?limit=50');

  const apiTemperaments = apiRaces.data.map(race => {
     return race.temperament.split(',')
  });
 var mergedTemperamentsArray = [].concat.apply([], apiTemperaments);

 const TemperamentsWithOutTrims = mergedTemperamentsArray.map((string) => {
   return string.trim();
 })
let finalTemperamentsArray = new Set(TemperamentsWithOutTrims);
res.send(Array.from(finalTemperamentsArray)) // aca obtengon un array con todos los temperamentos sin repetir . 
// try {
    //   const temperaments =  await Temperament.findAll();
    //   return res.json(temperaments);
    // } catch (err) {
    //   next(err);
    // }
  })
  
  

module.exports = router;




