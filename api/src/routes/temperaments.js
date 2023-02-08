const { Router } = require('express');
const {Temperament} = require('../db');
const router = Router();


router.get('/', async (req, res, next) => { // /temperaments/
    try {
      const temperaments =  await Temperament.findAll();
      return res.json(temperaments);
    } catch (err) {
      next(err);
    }
  })
  
 

module.exports = router;




