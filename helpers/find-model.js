const Cuento = require("../models/cuento");

const findModelById = async( typeOfModel, id ) => {
    let model;

    switch (typeOfModel) {
        
        case 'cuentos':
            model = await Cuento.findById(id)
            break;

        // case 'dibujos':
        //     model = await Dibujo.findById(id)
        //     break;
    
        default:
            return {
                model,
                status: 500,
                msg:'not validated'
            }
    }

    
    if(!model) {
        return {
            model,
            status: 400,
            msg:'the id is not valid or is not validated'
        }
    }
    
    return { model } 
}

module.exports = {
    findModelById
}