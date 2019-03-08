const router = require('express').Router();

const Controller = require('../controllers/ControladorDePruebas');

router.delete('/:id',   Controller.removeOperator);
router.get('/', Controller.getOperatorList);
router.get('/:id', Controller.getOperatorById);
router.post('/add', Controller.addOperator);
router.put('/:id', Controller.updateOperator);


module.exports = router;
