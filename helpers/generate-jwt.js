const jwt = require("jsonwebtoken");

const generateJWT = ( id = '' ) => {
    return new Promise((resolve, reject) => {

        const payload = { id };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if(err) {
                console.log(err);
                reject('the token could not be generated');
            }else {
                resolve(token);
            }
        });

    })
}

module.exports = {
    generateJWT
}