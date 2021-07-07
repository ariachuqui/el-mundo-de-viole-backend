const Cuento = require("../models/cuento");
const Dibujo = require("../models/dibujo");

const findModelById = async( typeOfModel, id ) => {
    let model;

    switch (typeOfModel) {
        
        case 'cuentos':
            model = await Cuento.findById(id)
            break;

        case 'dibujos':
            model = await Dibujo.findById(id)
            break;
    
        default:
            return {
                status: 500,
                msg:'not validated'
            }
    }

    
    if(!model) {
        return {
            status: 400,
            msg:'the id is not valid or is not validated'
        }
    }
    
    return { model } 
}

module.exports = {
    findModelById
}