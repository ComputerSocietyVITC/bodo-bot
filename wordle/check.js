const words = require('./words.json');

const wordCheck = (word, botWord, arr) => {
   for(var letIdx in word){
       if(word.indexOf(botWord[letIdx]) > -1){
           if(botWord[letIdx] === word[letIdx]){
               arr[letIdx] = '✅';
           }
           else{
               arr[letIdx] = '❔';
           }
       };
   } 
   return arr;
}

const getWord = () => {
    const index = Math.floor(Math.random() * words.length);
    
    return words[index].toLowerCase();
}

module.exports = {
    getWord: getWord,
    wordCheck: wordCheck,
}
