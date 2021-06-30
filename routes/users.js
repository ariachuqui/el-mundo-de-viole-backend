const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares');
const { createUser } = require('../controllers/users');

const router = Router();


//only the administrator is allowed to create a user
router.post('/',[
    check('name', 'name is required').not().isEmpty(),
    check('name', 'name has to be string').isString(),
    check('password', 'password has to be between 6 and 20 chars').isLength( { min: 6, max: 20 } ),
    validateFields
], createUser);


module.exports = router;