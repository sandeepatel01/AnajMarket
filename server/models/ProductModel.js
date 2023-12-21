const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: mongoose.ObjectId,
            ref: "Category",
            required: true,
        },
        quantity: {
            type: String,
            required: true,
        },
        photo: {
            data: Buffer,
            contentType: String,
        },
        sellerName: {
            type: String,
            // required: true,
        },
        sellerContactNo: {
            type: Number,
            // required: true,
        },
        state: {
            type: String,
            // required: true,
        },
        city: {
            type: String,
            // required: true,
        },
        sellerAddress: {
            type: String,
            // required: true,
        },
        shipping: {
            type: Boolean,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Products", productSchema);