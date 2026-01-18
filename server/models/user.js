const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username cannot be blank'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password cannot be blank']
    }
})

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 12);
})

module.exports = mongoose.model('User', userSchema);