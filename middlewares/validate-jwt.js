const { response } = require('express');
const jwt = require("jsonwebtoken");

const User = require('../models/user');

const validateJWT = async( req, res = response, next ) => {
    
    const token = req.header('x-token');

    if( !token ) {
        return res.status(401).json({
            msg: 'There is no token in the request'
        })
    }

    try {

        const { id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        //Find user by id
        const userAuthenticated = await User.findById( id );

         if( !userAuthenticated ) {
            return res.status(401).json({
                msg: 'token not valid'
            })
        }

        req.userAuthenticated = userAuthenticated._id;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:'token not valid'
        })
    }

}

module.exports = {
    validateJWT
}