const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateJWT } = require('../middlewares');
const { getDibujos, createDibujo } = require('../controllers/dibujos');

const router = Router();


//get all - public
router.get('/', getDibujos);

//post create - token 
router.post('/',[
    validateJWT,
    check('imgUrl', 'the title is required').not().isEmpty(),
    check('imgUrl', 'the title has to be a string').isString(),
    check('imgName', 'the url is required').not().isEmpty(),
    check('imgName', 'the url has to be a string').isString(),
    check('date', 'the date has to be a number').isNumeric(),
    check('date', 'the date is required').not().isEmpty(),
    validateFields
], createDibujo);





module.exports = router;