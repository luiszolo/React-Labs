const router = require('express').Router();

const TestController = require('../controllers/TestController');

router.delete('/find/:id', TestController.removeTest);
router.get('/by/:option?', TestController.getTestList);
router.get('/find/:id', TestController.getTestById);
router.post('/add', TestController.addTest);
router.put('/find/:id', TestController.updateTest);


module.exports = router;
