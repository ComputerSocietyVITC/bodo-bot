const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js');
const { execute } = require('./check');
const { wordlePlay } = require('../wordle/index');

const wordle = new SlashCommandBuilder().setName('wordle')
                .setDescription('Play a round of wordle')

module.exports = {
    data: wordle,
    async execute(interaction){
        const embed = new MessageEmbed().setTitle('# Wordle')
                                        .setColor('DARK_GREEN')
                                        .setDescription('It\'s **WORDLE**. \n ## How to Play \nWell you get 5 tries to guess a word.\nEach try you will know if you\'re \n- ✅(Correct Letter in Correct Position)\n- ❌(Wrong Letter)\n- ❔(Correct letter in wrong position)')
                                        .setImage('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.imgur.com%2FYiLlndO.png&f=1&nofb=1')
                                        .setAuthor({ name: 'cool-pants' });
        wordlePlay();
        await interaction.reply({ embeds: [embed] });
    }
}