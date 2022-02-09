const { wordCheck, getWord } = require('./check');

const arrOption = ['❌','❌','❌','❌','❌'];
const finOption = ['✅','✅','✅','✅','✅'];
const rounds = 5;
var inGame = false;

var res = [];
var playRounds = 0;
var roundWord = "";

const wordlePlay = () => {
    inGame = true;
    res = arrOption;
    playRounds = rounds;
    roundWord = getWord();      
};

const wordleGuess = (word) => {
    if(inGame){
        if(res !== finOption){
            if(playRounds > 0){
                res = wordCheck(word, roundWord, res);
                playRounds -= 1;
                return [true, res]; // [ Round Valid, Game Continues ]
            }
            inGame = false;
            return [false, false];
        }
        inGame = false;
        return [ true, false ];
    }
    return [ false, true ]
}

module.exports = {
    wordlePlay: wordlePlay,
    wordleGuess: wordleGuess,
};
