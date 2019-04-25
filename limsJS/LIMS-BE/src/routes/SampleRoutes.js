const router = require('express').Router();

const SampleController = require('../controllers/SampleController');

router.delete('/find/:id', SampleController.removeSample);
router.get('/by/:option?', SampleController.getSampleList);
router.get('/find/:id', SampleController.getSampleById);
router.post('/add', SampleController.addSample);
router.put('/find/:id', SampleController.updateSample);


module.exports = router;
