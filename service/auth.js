const jwt =  require("jsonwebtoken")
const Secret = "MySecret"

function GenerateToken(user){
    const Token =  jwt.sign({user},Secret)
    return Token
}

function AuthenticationCookie(req,res,next){
    const cookie = req.cookies?.Token
    if(!cookie){
        req.user = null;
        res.locals.user = null;
        return res.redirect("/user/signin")
        
    }
    const user  = ValidateToken(cookie)
    if(!user){
        req.user = null;
        res.locals.user = null;
        return res.redirect("/user/signin")
        
        }
    
    res.locals.user = user;
    req.user = user;
    console.log(req);
    next()
 

}

function ValidateToken(token){
    const user = jwt.verify(token,Secret)
    if(!user){
        user = null;
    }
    return user
}

module.exports = {GenerateToken,AuthenticationCookie,ValidateToken}