import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        username: {
            type: String,
            required: true,
            trim: true,
            index: true,
            unique: true,
            lowercase: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            index: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        avatar: {
            type: String,
            required: true
        },
        coverImage: {
            type: String
        }
    },
    { timestamps: true }
);


// Hash password using bcrypt Before save entry in DB
userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();

});

// compare password 
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};


// Generate JWT Token 
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullname: this.fullname,
            usernmane: this.usernmane
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}


userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullname: this.fullname,
            usernmane: this.usernmane
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User", userSchema);