const router = require('express').Router();

const AttributeController = require('../controllers/AttributeController');

router.delete('/:id', AttributeController.deleteAttribute);
router.get('/', AttributeController.getAttributes);
router.get('/:id', AttributeController.getAttributeById);
router.post('/insert', AttributeController.addAttribute);
router.put('/:id', AttributeController.updateAttribute);


module.exports = router;