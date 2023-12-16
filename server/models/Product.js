const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    productName: {
        type: String,
    },
    productDescription: {
        type: String,
    },
    former: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    ratingAndReviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RatingAndReview",
        }
    ],
    price: {
        type: Number,
    },
    thumbnail: {
        type: String,
    },
    tag: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
    },

});

module.exports = mongoose.model("Product", productSchema);