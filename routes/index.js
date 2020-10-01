const router = require('express').Router();

router.use('/metrics', require('./metrics'));

router.use('/logs', require('./logs'))

router.use('/check', require('./healthCheck'));

module.exports = router;