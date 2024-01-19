const express = require("express")

router = express.Router();

const {login, signUP} = require("../controllers/Auth")
const {cloudinaryFileUpload, fetchFile, incrementViewCount} = require("../controllers/fileUpload")
const {auth, isAdmin, isStudent} = require("../middleware/auth")

router.post("/login", login);
router.post("/signup", signUP);
router.post("/imageUPload", cloudinaryFileUpload);
router.get("/fetchImages", fetchFile);
router.post("/view/:imageId", incrementViewCount);

//private route for Test

router.get("/test", auth, (req, res) =>{
    res.json({
        success: true,
        message:"Welcome to private route for test"
    })
})


// Private routes

router.get("/student", auth, isStudent, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to private route of student"
    })
})

router.get("/admin", auth, isStudent, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to private route of admin"
    })
})

module.exports = router;