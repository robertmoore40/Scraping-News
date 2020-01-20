var router = require('express').Router();

var scrapeRoutes = require('./scrape');
router.use('/scrape', scrapeRoutes);


module.exports = router