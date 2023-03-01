const { Router } = require('express');
const dogsRoute = require('./dogsRaces');
const temperamentsRoute = require('./temperaments');


const router = Router();

router.use('/dogs', dogsRoute)
router.use('/temperaments', temperamentsRoute)
// AGREGAR EL DELETE. PA EL CRUD 
module.exports = router;
