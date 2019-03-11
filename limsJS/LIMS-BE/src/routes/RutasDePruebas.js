const router = require('express').Router();

const Controller = require('../controllers/ControladorDePruebas');

router.delete('/:id',   Controller.removeAttribute);
router.get('/', Controller.getAttributeList);
router.get('/:id', Controller.getAttributeById);
router.post('/add', Controller.addAttribute);
router.put('/:id', Controller.updateAttribute);


module.exports = router;
