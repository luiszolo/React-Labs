const router = require('express').Router();

const OperatorController = require('../controllers/OperatorController');

router.delete('/:id', OperatorController.deleteOperator);
router.get('/', OperatorController.getOperators);
router.get('/:id', OperatorController.getOperatorById);
router.post('/add', OperatorController.addOperator);
router.put('/:id', OperatorController.updateOperator);


module.exports = router;
