const router = require('express').Router();

router.use('/tests', require('./TestRoutes'));
router.use('/operators', require('./OperatorRoutes'));
router.use('/samples', require('./SampleRoutes'));
router.use('/logs', require('./LogRoutes'));
router.use('/attributes', require('./AttributeRoutes'));
router.use('/status', require('./StatusRoutes'));
router.use('/test-forms', require('./TestFormsRoutes'));
// router.use('/pruebas', require('./RutasDePruebas'));

module.exports = router;
