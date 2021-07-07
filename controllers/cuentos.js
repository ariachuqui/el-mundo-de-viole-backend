const { response } = require("express");

const Cuento = require("../models/cuento");


//get all - public
const getCuentos = async(req, res = response) => {
    const {limit = 5, skip = 0, search = ''} = req.query;
    const query = {title: { "$regex": `${search}`, "$options": "i" }};

    const cuentos = await Cuento.find( query )
        .sort( { date: -1 } )
        .limit( Number( limit ) )
        .skip( Number( skip ) )
   
    res.status(200).json({
        cuentos
    });
}

//get one - public 
const getCuento = async(req, res = response) => {
    const url = req.params.url;

    const cuento = await Cuento.findOne( { url } );

    res.status(200).json({
        cuento               
    });
}

//create
const createCuento = async(req, res = response) => {
    let newCuento = req.body;
    const url = newCuento.url.toLowerCase();
    newCuento.url = url;

    // Validate if the cuento already exists
    const cuentoExist = await Cuento.findOne({ url })

    if ( cuentoExist ) {
        return   res.status(400).json({
              msg: `The cuento ${newCuento.url} already exist`
          });
    }

    //Create products
    newCuento = new Cuento( newCuento );

    //Save in db
    await newCuento.save();

    res.status(200).json({
        msg: 'post - cuento created',
        newCuento
    });
}

//update 
const updateCuento = async(req, res = response) => {
    const id = req.params.id;

    const { url, ...rest } = req.body;

    if( url ) {
        rest.url = url.toLowerCase();
    }

    const cuento = await Cuento.findByIdAndUpdate( id, rest, {new: true} );

    res.status(200).json({
        msg: 'Cuento Updated',
        cuento
    });
}

//delete 
const deleteCuento = async(req, res = response) => {
    const { id } = req.params;

    const cuentoDeleted = await Cuento.findByIdAndDelete(id);

    res.status(200).json({
        msg: 'Cuento deleted',
        cuentoDeleted
    });
}

module.exports = {
    getCuentos,
    getCuento,
    createCuento,
    updateCuento,
    deleteCuento,
}