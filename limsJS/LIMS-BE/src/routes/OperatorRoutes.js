const router = require('express').Router();

const Controller = require('../controllers/OperatorController');

router.delete('/find/:id',   Controller.removeOperator);
router.get('/by/:option?', Controller.getOperatorList);
router.get('/find/:id', Controller.getOperatorById);
router.post('/add', Controller.addOperator);
router.put('/find/:id', Controller.updateOperator);

module.exports = router;
