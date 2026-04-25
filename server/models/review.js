const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Review text cannot be blank'],
        maxlength: [150, 'The maximum length of the Review text is 150 characters']
    },
    userId: {
        type: String,
        required: [true, 'Review text cannot be blank'],
    },
    reting: {
        type: Number,
        default: 3,
        enum: [1, 2, 3, 4, 5],
    },
    game: {
        type: String,
        enum: ["Bingo", "BirdHunter", "Capitals", "Counter", "Crazy100", "Cryptogram", "GuessNumber", "HappyFlower", "KukuKube", "Maze", "MemoryCards", "Nim", "Pidoku", "Puzzle", "RockScissorsPaper", "TripleEmojiMatch", "TugOfWar", "XO"]
    }
}, { timestamps: true })

module.exports = mongoose.model('Review', reviewSchema);