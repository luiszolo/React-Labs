const router = require('express').Router();

const TestAttributeController = require('../controllers/TestAttributeController');

router.delete('/:id', TestAttributeController.deleteTestAttribute);
router.get('/', TestAttributeController.getTestAttributes);
router.get('/:id', TestAttributeController.getTestAttributeById);
router.post('/insert', TestAttributeController.addTestAttribute);
router.put('/:id', TestAttributeController.updateTestAttribute);


module.exports = router;