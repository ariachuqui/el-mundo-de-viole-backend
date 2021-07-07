const { response } = require("express");

const Dibujo = require("../models/dibujo");


//getDibujos all 
const getDibujos = async(req, res = response) => {
    const { limit = 5, skip = 0 } = req.query;

    const dibujos = await Dibujo.find()
        .sort({date: -1})
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


module.exports = {
    getDibujos,
    createDibujo,
}