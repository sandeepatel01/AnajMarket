import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js"
import { uploadImagesOnCloudinary } from "../utils/fileUpload.js"
import { OTP } from "../models/otp.model.js"
import { Profile } from "../models/profile.model.js";

// *************** User Register controller *************
const registerUser = asyncHandler(async (req, res) => {

    const {
        fullname,
        username,
        email,
        password,
        // confirmPassword,
        accountType,
        otp

    } = req.body;

    // console.log("fullname: ", fullname);
    // console.log("email: ", email)

    if (
        [fullname, username, email, password, accountType, otp].some((field) =>
            field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    };


    // if (password !== confirmPassword) {
    //     throw new ApiError(400, "Password and confirmPassword value does not match, Please try again!")
    // }


    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        throw new ApiError(409, "User with username or email already exists")
    };


    const avatarLocalPath = req.files?.avatar[0]?.path;
    console.log("avatar local path: ", avatarLocalPath);

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar File is required")
    };

    const avatar = await uploadImagesOnCloudinary(avatarLocalPath);
    console.log("Avatar Image:", avatar);

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required!!")
    };

    const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    console.log("recent OTP: ", recentOtp);

    if (recentOtp.length === 0) {
        throw new ApiError(400, "OTP not Found!")
    } else if (otp !== recentOtp[0].otp) {
        throw new ApiError(400, "Invalid OTP")
    }

    const profileDetails = await Profile.create({
        gender: null,
        dateOfBirth: null,
        about: null,
        contactNumber: null,
    });


    const user = await User.create({
        fullname,
        username: username.toLowerCase(),
        email,
        password,
        // confirmPassword,
        accountType: accountType,
        avatar: avatar?.url || "",
        additionalDetails: profileDetails?._id
    });

    const createdUser = await User.findById(user._id).select(
        "-password  refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res
        .status(201)
        .json(
            new ApiResponse(200, createdUser, "User Registerd Successfully")
        )


});

// ************ User Login Controller ************** 
const loginUser = asyncHandler(async (req, res) => {

    const { username, email, password } = req.body;

    if (!(username || email)) {
        throw new ApiError(400, "username OR email is required")
    };

    const user = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (!user) {
        throw new ApiError(400, "User does not exist")
    };


    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user Credentials")
    };

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    const option = {
        httpOnly: true,
        secure: true
    };

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    return res
        .status(200)
        .cookie("accessToken", accessToken.option)
        .cookie("refreshToken", refreshToken, option)
        .json(
            new ApiResponse(
                200,
                { user: loggedInUser, accessToken, refreshToken },
                "User Logged In Successfully"
            )
        )

});


export {
    registerUser,
    loginUser
};