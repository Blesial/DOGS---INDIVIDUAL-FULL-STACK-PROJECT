const { Router } = require('express');
const dogsRoute = require('./dogsRaces');
const temperamentsRoute = require('./temperaments');


const router = Router();

router.use('/dogs', dogsRoute)
router.use('/temperaments', temperamentsRoute)


module.exports = router;
