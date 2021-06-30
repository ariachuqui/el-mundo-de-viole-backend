const { response } = require("express");
const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL );

const { findModelById } = require('../helpers')


const uploadFiles = async(req, res=response) => {
    const allowedExtensions = [ 'png', 'jpg', 'jpeg', 'gif' ];
    const { file } = req.files;
    const nameCutOff = file.name.split('.');
    const extension = nameCutOff[ nameCutOff.length -1  ];
    const imgName = nameCutOff[0];

    //Validate extension
    if( !allowedExtensions.includes( extension ) ) {
        return res.status(400).json({
            msg: `${extension} extension is not allowed - ${allowedExtensions}`
        })
    }

    try {
        const { tempFilePath } = file;
        const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
    
        res.status(500).json({
            imgUrl: secure_url,
            imgName
        })
    } catch (err) {
        res.status(400).json({
            msg: err
        })
    }
  
}

const updateImg = async(req, res = response) => {

    const {collection, id} = req.params;
    const { file } = req.files;

    //Find Model
    const {model, status, msg } = await findModelById( collection, id )
    //If model === null, throw error
    if( !model ){
        if(status === 500) 
            return res.status(500).json({ msg: msg });

        if(status === 400) 
            return res.status(400).json({ msg: msg });
    }

    // Clean previous images
    if(model.imgUrl) {
        const nameArr = model.imgUrl.split('/');
        const name = nameArr[nameArr.length - 1];
        const [ public_id ] = name.split('.');

        await cloudinary.uploader.destroy( public_id );
    }

    const nameCutOff = file.name.split('.');
    const imgName = nameCutOff[0];

    const { tempFilePath } = file;

    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );

    model.imgUrl = secure_url;
    model.imgName = imgName;
    await model.save();

    res.status(200).json({
        msg: 'image updated',
        model
    });
}

const getImage = async(req, res = response) => {

    const {collection, id} = req.params;

    const {model, status, msg } = await findModelById( collection, id )
    //If model === null, throw error
    if( !model ){
        if(status === 500) 
            return res.status(500).json({ msg: msg });

        if(status === 400) 
            return res.status(400).json({ msg: msg });
    }

    const { imgUrl } = model;

    res.status(200).json( {
        imgUrl
    } );
}

const deleteImage = async(req, res = response) => {
    const {collection, id} = req.params;

    //Find Model
    const {model, status, msg } = await findModelById( collection, id )
    //If model === null, throw error
    if( !model ){
        if(status === 500) 
            return res.status(500).json({ msg: msg });

        if(status === 400) 
            return res.status(400).json({ msg: msg });
    }

    // Clean previous images
    if(model.imgUrl) {
        const nameArr = model.imgUrl.split('/');
        const name = nameArr[nameArr.length - 1];
        const [ public_id ] = name.split('.');

        await cloudinary.uploader.destroy( public_id );
    }

    model.imgUrl = null;
    model.imgName = null;
    await model.save();

    res.status(500).json({
        msg: 'image updated',
        model
    });
}

module.exports = {
    uploadFiles,
    updateImg,
    getImage,
    deleteImage
}