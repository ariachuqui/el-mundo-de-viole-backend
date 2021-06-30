const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateJWT } = require('../middlewares');
const { existDibujoId } = require('../helpers');
const { getDibujos, createDibujo, deleteDibujo } = require('../controllers/dibujos');

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
    validateFields
], createDibujo);

//delete - token
router.delete('/:id',[
    validateJWT,
    check('id', 'the id is not valid').isMongoId(),
    check('id').custom(existDibujoId),
    validateFields
], deleteDibujo);




module.exports = router;