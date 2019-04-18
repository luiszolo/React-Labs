const router = require('express').Router();

const LogController = require('../controllers/LogController');

router.delete('/:id', LogController.deleteLog);
router.get('/', LogController.getLogs);
router.get('/:name', LogController.getLogBySample);
router.post('/add', LogController.addLog);
router.put('/:id', LogController.updateLog);


module.exports = router;
