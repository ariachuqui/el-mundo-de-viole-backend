const { Schema, model } = require("mongoose");

const dibujoSchema = Schema({
    imgUrl: {
        type: String,
        required: [true, 'the imgUrl is required']
    },
    imgName: {
        type: String,
        required: [true, 'the imgName is required']
    },
    date: {
        type: Number,
        required: true
    }
})

dibujoSchema.methods.toJSON = function() {
    const { __v, _id, ...dibujo } = this.toObject();
    dibujo.id = _id;
    return dibujo;
}

module.exports = model("Dibujo", dibujoSchema);