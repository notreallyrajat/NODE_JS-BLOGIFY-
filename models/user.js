const {createHash,randomBytes} = require("crypto");
const mongoose = require("mongoose");
const{ValidateToken,GenerateToken} = require("../service/auth")

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    salt: {
      type: String,
    },

    profileImageURL: {
      type: String,
      default: "/public/profile.webp",
    },

    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

// Hash the password befor Saving in the database
userSchema.pre('save', async function () {
    const hash = createHash('sha256');
    const user = this;
    if (!user.isModified('password')) return ;
    const salt =  randomBytes(16).toString("hex")
    user.password = await hash.update(user.password+salt).digest("hex");
    user.salt = salt;
});

// Match Password and generateToken
userSchema.statics.PassToken = async function(req,res){
  const{email,password} = req.body;
  const user = await this.findOne({email});
  if(!user) return res.send("No Such User")
  console.log(`email mil gyee ${email} !!`)
  const hash = createHash("sha256");
  const salt = user.salt;
  console.log(`salt mil gya salt ${salt}`)
  const hashedpassword = await hash.update(password+salt).digest("hex")
  console.log(`hashed password ${hashedpassword}`)
  console.log(`user password ${user.password}`)
  if(hashedpassword===user.password){
    const token = GenerateToken({email :user.email, fullname:user.fullname,pfp:user.profileImageURL,role:user.role})
    res.cookie("Token",token)
    return token
  }
}

const User = mongoose.model("User", userSchema);

module.exports = User;
