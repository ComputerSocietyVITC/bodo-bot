const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js');
const { wordleGuess } = require('../wordle/index.js');
const { execute } = require('./check.js');

const data = new SlashCommandBuilder().setName('check')
                                        .setDescription('Check the your wordle word..');

data.addStringOption(option => option.setName('word'). setDescription('Your word').setRequired(true));

module.exports = {
    data: data,
    async execute(interaction){
        const word = interaction.options.getString('word');
        const res = wordleGuess(word);
        if(res[0] === true){
            if(res[1] === false){
                interaction.reply("You won!!");
                return;
            }
            var line2 = ["| ",...res[1].map(x => x+" | ")].join("");
            var line1 = [word,"\n|-|-|-|-|-|\n",line2].join("");


            const embed = new MessageEmbed().setTitle('# Wordle')
                                        .setColor('DARK_GREEN')
                                        .setDescription(line1)
                                        .setAuthor({ name: 'cool-pants' });


            interaction.reply({ embeds: [embed] });
            return;
        }
        if(res[1] === false){
            interaction.reply("Rounds Ended! You Lost :( ");
            return;
        }
        interaction.reply("No Game ongoing, `\\wordle` to start a game...");
    }
}