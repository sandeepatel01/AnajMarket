const mongoose = require("mongoose");

const tagsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
});

module.exports = mongoose.model("Tag", tagsSchema);