const router = require('express').Router();

const LogController = require('../controllers/LogController');

router.get('/find/:id', LogController.getLogBySample);
router.post('/add', LogController.addLog);


module.exports = router;
