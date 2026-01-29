const mongoose = require('mongoose');
const Ad = require('./ad');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Company name cannot be blank'],
        unique: true
    },
    ads: [{type: mongoose.Schema.Types.ObjectId, ref: 'Ad'}]
})

module.exports = mongoose.model('Company', companySchema);