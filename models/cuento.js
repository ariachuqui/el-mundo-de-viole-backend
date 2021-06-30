const { Schema, model } = require("mongoose");

const cuentoSchema = Schema({
    title: {
        type: String,
        require: [ true, 'Title is required' ]
    },
    url: {
        type: String,
        require: [ true, 'url is required' ]
    },
    body: {
        type: String,
    },
    imgUrl: {
        type: String,
    },
    imgName: {
        type: String,
    }
})

cuentoSchema.methods.toJSON = function() {
    const { __v, _id, ...cuento } = this.toObject();
    cuento.id = _id;
    return cuento;
}

module.exports = model("Cuento", cuentoSchema);