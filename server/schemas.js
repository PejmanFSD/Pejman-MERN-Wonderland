const Joi = require('joi');

module.exports.adSchema = Joi.object({
    ad: Joi.object({
        company: Joi.string().trim().required(),
        text: Joi.string().trim().required().max(250)
        // image: Joi.string().trim().required()
    }).required(),
    deleteImages: Joi.array()
});

module.exports.userSchema = Joi.object({
    user: Joi.object({
        username: Joi.string().trim().required(),
        password: Joi.string().trim().required(),
        ads: Joi.array()
            .items(Joi.string().hex().length(24))
            .required()
    }).required()
});

module.exports.reviewSchema = Joi.object({
  body: Joi.string().required(),
  rating: Joi.number().min(0).max(5),
  game: Joi.string().valid(
    "Bingo", "BirdHunter", "Capitals", "Counter",
    "Crazy100", "Cryptogram", "GuessNumber",
    "HappyFlower", "KukuKube", "Maze", "MemoryCards",
    "Nim", "Pidoku", "Puzzle", "RockScissorsPaper",
    "TripleEmojiMatch", "TugOfWar", "XO"
  ).required()
});