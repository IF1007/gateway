const router = require('express').Router();
const ElasticsearchService = require('../services/elasticsearchService');
const logsController = require('../controllers/logsController')(new ElasticsearchService());

router.get('/', logsController.getLogs.bind(logsController));
router.post('/', logsController.customQuery.bind(logsController));

module.exports = router;