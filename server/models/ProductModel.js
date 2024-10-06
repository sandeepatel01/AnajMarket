const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
)

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
        },
        sellerContactNo: {
            type: Number,
        },
        state: {
            type: String,
        },
        city: {
            type: String,
        },
        sellerAddress: {
            type: String,
        },
        shipping: {
            type: Boolean,
        },
        reviews: [reviewSchema],
        rating: {
            type: Number,
            required: true,
            default: 0,
        },
        numReviews: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Products", productSchema);