const { response } = require("express");

const Dibujo = require("../models/dibujo");


//getDibujos all 
const getDibujos = async(req, res = response) => {
    const {limit = 5, skip = 0} = req.query;

    const dibujos = await Dibujo.find()
        .limit( Number(limit) )
        .skip( Number(skip) )
   
    res.status(200).json({
        dibujos
    });
}

//createDibujo
const createDibujo = async(req, res = response) => {
    let newDibujo = req.body;
    const imgUrl = newDibujo.imgUrl;

    // Validate if the cuento already exists
    const dibujoExist = await Dibujo.findOne({ imgUrl })

    if ( dibujoExist ) {
        return   res.status(400).json({
              msg: `The dibujo ${newDibujo.imgUrl} already exist`
          });
    }

    //Create products
    newDibujo = new Dibujo( newDibujo );

    //Save in db
    await newDibujo.save();

    res.status(200).json({
        msg: 'post - dibujo created',
        newDibujo
    });
}

//deleteDibujo
const deleteDibujo = async(req, res = response) => {
    const { id } = req.params;

    const dibujoDeleted = await Dibujo.findByIdAndDelete(id);

    res.status(200).json({
        msg: 'Dibujo deleted',
        dibujoDeleted
    });
}

module.exports = {
    getDibujos,
    createDibujo,
    deleteDibujo,
}