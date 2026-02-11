const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Company name cannot be blank']
    },
    text: {
        type: String,
        required: [true, 'Ad text cannot be blank'],
        maxlength: [250, 'The maximum length of the Ad text is 250 characters']
    },
    image: {
        type: String,
        required: [true, 'Image cannot be blank']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Ad', adSchema);