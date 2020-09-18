const router = require('express').Router();
const metricsController = require('../controllers/metrics_controller');

router.get('/', metricsController.getMetrics.bind(metricsController));
router.get('/:_metric', metricsController.getMetric.bind(metricsController));


module.exports = router;