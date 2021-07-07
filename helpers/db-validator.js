const Cuento = require("../models/cuento");
const Dibujo = require("../models/dibujo");

const existCuentoId = async( id = '' ) => {
    const existCuento = await Cuento.findById( id );
    if ( !existCuento ) {
        throw new Error('this id does not exists');
    }
}

const existCuentoUrl = async( url = '' ) => {
    const existCuento = await Cuento.findOne( { url } );
    if ( !existCuento ) {
        throw new Error('this url does not exists');
    }
}

const existDibujoId = async( id = '' ) => {
    const existDibujo = await Dibujo.findById( id );
    if ( !existDibujo ) {
        throw new Error('this id does not exists');
    }
}

const collectionsAllowed = ( collection = '', collections = [] ) => {
    const include = collections.includes( collection );
    if( !include ) {
        throw new Error(`The collection ${collection} is not allowed - ${collections}`)
    }
    return true
}

module.exports = {
    existCuentoId,
    existDibujoId,
    collectionsAllowed,
    existCuentoUrl
}