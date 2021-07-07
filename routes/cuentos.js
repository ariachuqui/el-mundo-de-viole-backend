const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateJWT } = require('../middlewares');
const { existCuentoId, existCuentoUrl } = require('../helpers');
const { 
    getCuentos,
    getCuento,
    createCuento,
    updateCuento,
    deleteCuento
} = require('../controllers/cuentos');

const router = Router();


//get all - public
router.get('/', getCuentos);

//get one - public 
router.get('/:url',[
    check('url').custom( existCuentoUrl ),
    validateFields
], getCuento);

//post create - token
router.post('/',[
    validateJWT,
    check('title', 'the title is required').not().isEmpty(),
    check('title', 'the title has to be a string').isString(),
    check('url', 'the url is required').not().isEmpty(),
    check('url', 'the url has to be a string').isString(),
    check('date', 'the date has to be a number').isNumeric(),
    check('date', 'the date is required').not().isEmpty(),
    validateFields
], createCuento);

//put update - token
router.put('/:id',[
    validateJWT,
    check( 'id', 'the id is not valid' ).isMongoId(),
    check('id').custom( existCuentoId ),
    validateFields
], updateCuento);

//delete - token
router.delete('/:id',[
    validateJWT,
    check('id', 'This id is not valid').isMongoId(),
    check('id').custom( existCuentoId ),
    validateFields
], deleteCuento);

module.exports = router;