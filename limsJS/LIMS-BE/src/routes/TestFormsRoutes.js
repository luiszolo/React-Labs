const router = require('express').Router();

const TestFormsController = require('../controllers/TestFormsController');

router.post('/add', TestFormsController.insertData);


module.exports = router;
