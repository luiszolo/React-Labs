const router = require('express').Router();

const SampleController = require('../controllers/SampleController');

router.delete('/:name', SampleController.deleteSample);
router.get('/', SampleController.getSamples);
router.get('/:test?/:name?', SampleController.getSampleByName);
router.post('/add', SampleController.addSample);
router.put('/:name', SampleController.updateSample);


module.exports = router;
