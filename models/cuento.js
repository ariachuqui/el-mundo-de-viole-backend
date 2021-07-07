const { Schema, model } = require("mongoose");

const cuentoSchema = Schema({
    title: {
        type: String,
        required: [ true, 'Title is required' ]
    },
    url: {
        type: String,
        required: [ true, 'url is required' ]
    },
    body: String,
    imgUrl: String,
    imgName: String,
    date: Number
})

cuentoSchema.methods.toJSON = function() {
    const { __v, _id, ...cuento } = this.toObject();
    cuento.id = _id;
    return cuento;
}

module.exports = model("Cuento", cuentoSchema);