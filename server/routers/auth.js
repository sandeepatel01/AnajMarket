// Import the require models 
const express = require("express");
const router = express.Router();

const { register, login, testController, forgotPassword, updateProfileController } = require("../controllers/Auth");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware")


//routing
//REGISTER || METHOD POST
router.post("/register", register);

//LOGIN || POST
router.post("/login", login);

//Forgot Password || POST
router.post("/forgot-password", forgotPassword);


//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);


module.exports = router;