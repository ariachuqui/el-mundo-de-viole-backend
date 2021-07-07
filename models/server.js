const express = require('express');
const helmet = require('helmet');
var cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../db/config')

class Server {
    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            cuentos: '/api/cuento',
            dibujos: '/api/dibujos',
            uploads: '/api/uploads',
            // users: '/api/user'
        };

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();

        //Db
        this.conectarDB();
    }

    async conectarDB() {
        await dbConnection();
    };

    middlewares() {
        this.app.use( express.json() );
        this.app.use( helmet() );
        this.app.use( cors() );

        // File upload
        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use( this.paths.auth, require('../routes/auth') ); 
        this.app.use( this.paths.cuentos, require('../routes/cuentos') ); 
        this.app.use( this.paths.dibujos, require('../routes/dibujos') ); 
        this.app.use( this.paths.uploads, require('../routes/uploads') ); 
        // this.app.use( this.paths.users, require('../routes/users') ); 
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`App running in port ${ this.port }`);
        })
    }

    db() {
        
    }
}

module.exports = Server;

