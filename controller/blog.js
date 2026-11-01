const BlogSchema = require("../models/blog");

async function CreateBlog(req,res){
    console.log(req.body)
    const {file,title,body} = req.body
    const blog = await BlogSchema.create({
        title: title, 
        body: body,
        coverImageURL: req.file?`/public/uploads/`:""
    })
    res.redirect("/")
}

async function returnBlogs(req,res){
    const Blogs = await BlogSchema.find({});    
    res.locals.user = req.user || null;
    console.log(`HEllo yaha tk aagya hu ${Blogs}`)
    res.render("home",{Blogs,user : req.user})
}    


module.exports = { CreateBlog , returnBlogs }