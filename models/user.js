const { Schema, model } = require("mongoose");

const userSchema = Schema({
    name: {
        type: String,
        required: [ true, 'Name is required' ]
    },
    password: {
        type: String,
        required: [ true, 'Password is required' ]
    }
})

userSchema.methods.toJSON = function() {
    const { __v, _id, password, ...user } = this.toObject();
    user.id = _id;
    return user;
}

module.exports = model("User", userSchema);