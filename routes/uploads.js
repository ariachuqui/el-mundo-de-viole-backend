const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields,validateFile, validateJWT } = require('../middlewares');
const { collectionsAllowed } = require('../helpers');
const { uploadFiles, updateImg, getImage, deleteImage } = require('../controllers/uploads');

const router = Router();


router.post('/', [validateJWT, validateFile] , uploadFiles);

router.put('/:collection/:id',[
    validateJWT,
    validateFile,
    check('id', 'id is not valid').isMongoId(),
    check('collection').custom( c => collectionsAllowed( c, ['cuentos', 'dibujos'] ) ),
    validateFields
], updateImg);

router.get('/:collection/:id',[
    check('id', 'id is not valid').isMongoId(),
    check('collection').custom( c => collectionsAllowed( c, ['cuentos', 'dibujos'] ) ),
    validateFields
], getImage);

router.delete('/:collection/:id',[
    validateJWT,
    check('id', 'id is not valid').isMongoId(),
    check('collection').custom( c => collectionsAllowed( c, ['cuentos', 'dibujos'] ) ),
    validateFields
], deleteImage);



module.exports = router;