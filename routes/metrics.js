const router = require('express').Router();

const PrometheusService = require('../services/prometheusService');
const metricsController = require('../controllers/metricsController')(new PrometheusService());

router.get('/', metricsController.getMetrics.bind(metricsController));
router.get('/:_metric', metricsController.getMetric.bind(metricsController));

//router.get('/dimensions', metricsController.getDimensions.bind(metricsController));
//router.get('/dimensions/:_dimension', metricsController.getDimension.bind(metricsController));


module.exports = router;