const router = require('express').Router();

const Controller = require('../controllers/StatusController');

router.delete('/find/:id',   Controller.removeStatus);
router.get('/by/:option?', Controller.getStatusList);
router.get('/find/:id', Controller.getStatusById);
router.post('/add', Controller.addStatus);
router.put('/find/:id', Controller.updateStatus);


module.exports = router;
