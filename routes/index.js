const router = require('express').Router();

/* router.get('/', function(request, response){
    response.status(201);
    response.send('Hello World!')
}); */

router.use('/metrics', require('./metrics'));
router.use('/dimensions', require('./dimensions'));

module.exports = router;