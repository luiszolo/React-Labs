const router = require('express').Router();

const TestController = require('../controllers/TestController');

router.delete('/:id', TestController.deleteTest);
router.get('/', TestController.getTests);
router.get('/:id', TestController.getTestById);
router.post('/add', TestController.addTest);
router.put('/:id', TestController.updateTest);


module.exports = router;
