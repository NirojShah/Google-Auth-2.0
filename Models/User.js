const {
    Schema,
    model
} = require("mongoose")

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = model("userGoogle", userSchema)