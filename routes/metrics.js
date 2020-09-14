const router = require('express').Router();
const metricsController = require('../controllers/metrics_controller');

router.get('/', metricsController.getMetrics.bind(metricsController));

module.exports = router;