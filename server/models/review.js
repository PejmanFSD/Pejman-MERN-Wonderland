const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    body: {
        type: String,
        required: [true, 'Review text cannot be blank']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    rating: {
        type: Number
    },
    game: {
        type: String,
        enum: ["Bingo", "BirdHunter", "Capitals", "Counter",
            "Crazy100", "Cryptogram", "GuessNumber",
            "HappyFlower", "KukuKube", "Maze", "MemoryCards",
            "Nim", "Pidoku", "Puzzle", "RockScissorsPaper",
            "TripleEmojiMatch", "TugOfWar", "XO"],
        index: true // Because we'll query by game
    }
}, { timestamps: true })

module.exports = mongoose.model('Review', reviewSchema);