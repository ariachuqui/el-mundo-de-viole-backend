const { response } = require("express");
const bcryptjs = require('bcryptjs');

const User = require("../models/user");

const { generateJWT } = require("../helpers");


const login = async( req, res = response ) => {

    const {name, password} = req.body;

    try {

        const user = await User.findOne({ name });

        // Varificate id user exist
        if( !user ) {
            return res.status(400).json({
                msg: 'User / password are not correct'
            })
        }

        //Validate password
        const validPassword = bcryptjs.compareSync(password, user.password)
        if(!validPassword) {
            return res.status(400).json({
                msg:'User / password are not correct'
            })
        }

        //Generate JWT
        const token = await generateJWT(user.id);


        res.json({
            user,
            token
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ 
            msg: 'talk to the administrator'
        })
    }

}

const revalidarToken = async(req, res = response) => {

    const uid = req.userAuthenticated;

    try {

        // Generar nuevo JWT
        const token = await generateJWT(uid);
    
        res.status(200).json({
            ok: true,
            token,
            uid,
        });
        
    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: "please communicate with the administrator",
        })
    }

};

module.exports = {
    login,
    revalidarToken
}