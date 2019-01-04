const router = require('express').Router();

const StatusController = require('../controllers/StatusController');

router.delete('/:id', StatusController.deleteStatus);
router.get('/', StatusController.getStatuss);
router.get('/:id', StatusController.getStatusById);
router.post('/insert', StatusController.addStatus);
router.put('/:id', StatusController.updateStatus);


module.exports = router;
