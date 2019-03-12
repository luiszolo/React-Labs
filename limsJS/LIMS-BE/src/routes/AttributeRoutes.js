const router = require('express').Router();

const Controller = require('../controllers/AttributeController');

router.delete('/find/:id',   Controller.removeAttribute);
router.get('/by/:option?', Controller.getAttributeList);
router.get('/find/:id', Controller.getAttributeById);
router.post('/add', Controller.addAttribute);
router.put('/find/:id', Controller.updateAttribute);


module.exports = router;
