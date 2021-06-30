const { Schema, model } = require("mongoose");

const dibujoSchema = Schema({
    imgUrl: {
        type: String,
        require: [true, 'the imgUrl is required']
    },
    imgName: {
        type: String,
        require: [true, 'the imgName is required']
    }
})

dibujoSchema.methods.toJSON = function() {
    const { __v, _id, ...dibujo } = this.toObject();
    dibujo.id = _id;
    return dibujo;
}

module.exports = model("Dibujo", dibujoSchema);