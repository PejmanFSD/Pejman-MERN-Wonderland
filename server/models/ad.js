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
    images: [ // Based on cloudinary documentation
        {
            url: String, // We use the returned url to shpw each image
            filename: String
        }
    ]
    // author: { // The owner of the ad
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // }
}, { timestamps: true })

module.exports = mongoose.model('Ad', adSchema);