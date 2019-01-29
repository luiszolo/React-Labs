const router = require('express').Router();

const StatusController = require('../controllers/StatusController');

router.delete('/:id', StatusController.deleteStatus);
router.get('/', StatusController.getStatus);
router.get('/:id', StatusController.getStatusById);
router.post('/add', StatusController.addStatus);
router.put('/:id', StatusController.updateStatus);


module.exports = router;
