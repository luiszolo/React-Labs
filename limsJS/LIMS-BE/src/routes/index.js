const router = require('express').Router();

router.use('/tests', require('./TestRoutes'));
router.use('/operators', require('./OperatorRoutes'));
router.use('/samples', require('./SampleRoutes'));
router.use('/logs', require('./LogRoutes'));
router.use('/attributes', require('./AttributeRoutes'));
router.use('/sample-values', require('./SampleValueRoutes'));
router.use('/status', require('./StatusRoutes'));

module.exports = router;
