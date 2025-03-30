const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "İsim gereklidir"],
    },
    lastName: {
      type: String,
      required: [true, "İsim gereklidir"],
    },
    email: {
      type: String,
      required: [true, "E-posta gereklidir"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Şifre gereklidir"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["student", "instructor", "admin"],
      default: "student",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },  
  },
  { timestamps: true }
);
// Şifreyi kaydetmeden önce hashle
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });
  
module.exports = mongoose.model("User", userSchema);