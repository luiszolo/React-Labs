const router = require('express').Router();

const LogController = require('../controllers/LogController');

router.delete('/:id', LogController.deleteLog);
router.get('/', LogController.getLogs);
router.get('/:id', LogController.getLogById);
router.post('/add', LogController.addLog);
router.put('/:id', LogController.updateLog);


module.exports = router;
