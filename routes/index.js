const router = require('express').Router();

const apiRoutes = require('./api');
const htmlRoutes = require('./htmlPage.js');

router.use('/', htmlRoutes);
router.use('/api', apiRoutes);

module.exports = router;