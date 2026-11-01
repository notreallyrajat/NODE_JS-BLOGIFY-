const BlogSchema = require("../models/blog");

async function CreateBlog(req,res){
    const {file,title,body} = req.body
    console.log(req.id)
    const blog = await BlogSchema.create({
        title: title, 
        body: body,
        coverImageURL: req.file?`uploads/${req.id}-${req.file.originalname}`:undefined
    })
    res.redirect("/")
}

async function returnBlogs(req,res){
    const Blogs = await BlogSchema.find({});    
    res.locals.user = req.user || null;
    console.log(`HEllo yaha tk aagya hu ${Blogs}`)
    res.render("home",{Blogs,user : req.user})
}  

async function DisplayBlog(req,res){
    
}

module.exports = { CreateBlog , returnBlogs }