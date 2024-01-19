const mongoose = require("mongoose");


require("dotenv").config()

const fileSchema = new mongoose.Schema({
    Name:{
        type: String,
        required: true

    },

    Description: {
        type : String
    },

    file: {
        type : String

    },

    views: {
        type: Number,
        default: 0,
      },

})



module.exports = mongoose.model("Files", fileSchema)