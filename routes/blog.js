const express = require("express")
const router = express.Router();
const multer =  require("multer")
const path = require("path")
const {CreateBlog} = require("../controller/blog")


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });


router.get("/blog",(req,res)=>{
    res.render("addblog")
   
})

router.post("/blog",upload.single("coverImage"),CreateBlog)

module.exports = router;