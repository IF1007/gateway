const router = require('express').Router();
const metricsController = require('../controllers/metrics_controller');

router.get('/', metricsController.getDimensions.bind(metricsController));
router.get('/:_dimension', metricsController.getDimension.bind(metricsController));


module.exports = router;