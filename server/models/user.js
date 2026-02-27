const mongoose = require("mongoose");
const Ad = require("./ad");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username cannot be blank"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password cannot be blank"],
  },
  message: {
    type: String,
  },
  totalPoint: {
    type: Number,
    default: 0,
  },
  role: {
    type: String,
    enum: ["Admin", "Player"],
    default: "Player",
  },
  // ads: [{type: mongoose.Schema.Types.ObjectId, ref: 'Ad'}]
});
// Comparing the password
// (The one that the user types in login form and the one in database):
userSchema.statics.findAndValidate = async function (username, password) {
  const foundUser = await this.findOne({ username }); // "this" refers to "userSchema"
  if (!foundUser) return false;
  const isValid = await bcrypt.compare(password, foundUser.password);
  return isValid ? foundUser : false;
};
// Hashing the password:
userSchema.pre("save", async function () {
  // Don't re-hash the password if we're updatign it!
  // Only re-hash it in the registration process
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});
// For including the hashed password when the user is sent as JSON:
userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});

module.exports = mongoose.model("User", userSchema);
