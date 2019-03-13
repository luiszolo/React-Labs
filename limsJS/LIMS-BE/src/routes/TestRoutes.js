const router = require('express').Router();

const TestController = require('../controllers/TestController');

router.delete('/find/:id', TestController.deleteTest);
router.get('/by/:option?', TestController.getTests);
router.get('/find/:id', TestController.getTestById);
router.post('/add', TestController.addTest);
router.put('/find/:id', TestController.updateTest);


module.exports = router;
