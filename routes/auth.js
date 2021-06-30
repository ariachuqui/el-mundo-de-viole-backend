const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateJWT } = require('../middlewares');
const { login, revalidarToken } = require('../controllers/auth');

const router = Router();


router.post('/login',[
    check('name', 'this name is required').not().isEmpty(),
    check('password', 'this password is required').not().isEmpty(),
    validateFields
], login);

router.get("/renew",validateJWT ,revalidarToken);


module.exports = router