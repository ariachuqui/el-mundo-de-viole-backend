const { response } = require("express");
const bcryptjs = require('bcryptjs');

const User = require("../models/user");


const createUser = async(req, res = response) => {

    const {name, password} = req.body;
    const user = new User( {name, password} );

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    //Guardar en BD
    await user.save();

    res.status(201).json({
        msg: 'User created',
        user
    });
}

module.exports = {
    createUser
}