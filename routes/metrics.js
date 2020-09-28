const router = require('express').Router();

const PrometheusService = require('../services/prometheusService');
const metricsController = require('../controllers/metricsController')(new PrometheusService());

router.get('/', metricsController.getMetrics.bind(metricsController));
router.get('/m/:_metric', metricsController.getMetric.bind(metricsController));

router.get('/ds', metricsController.getDimensions.bind(metricsController));
router.get('/ds/:_dimension', metricsController.getDimension.bind(metricsController));


module.exports = router;