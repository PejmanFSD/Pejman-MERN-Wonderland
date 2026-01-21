const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Company name cannot be blank']
    },
    text: {
        type: String,
        required: [true, 'Ad text cannot be blank'],
        maxlength: [350, 'The maximum length of the Ad text is 350 characters']
    }
})

module.exports = mongoose.model('Ad', adSchema);