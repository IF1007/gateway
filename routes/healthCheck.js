const router = require('express').Router(),
  healthCheckController = require('../controllers/healthCheckController');

router.get('/health', healthCheckController.getHealth.bind(healthCheckController));
router.get('/version', healthCheckController.getVersion.bind(healthCheckController));

module.exports = router;