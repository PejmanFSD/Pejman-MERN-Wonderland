const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Ad text cannot be blank'],
        maxlength: [250, 'The maximum length of the Ad text is 250 characters']
    },
    image: {
        type: String,
        required: [true, 'Image cannot be blank']
    }
})

module.exports = mongoose.model('Ad', adSchema);