var router = require('express').Router();

var apiRoutes = require('./api');

router.use('/api',apiRoutes);


router.get('/', function (req, res) {
    console.log('Home');
    res.send('Home');
})








module.exports = router