const router = require('express').Router();

const SampleValueController = require('../controllers/SampleValueController');

router.delete('/:id', SampleValueController.deleteSampleValue);
router.get('/', SampleValueController.getSampleValues);
router.get('/:id', SampleValueController.getSampleValueById);
router.post('/add', SampleValueController.addSampleValue);
router.put('/:id', SampleValueController.updateSampleValue);


module.exports = router;
