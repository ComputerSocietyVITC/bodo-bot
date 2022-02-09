const dotenv = require('dotenv'); dotenv.config();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { wordlePlay } = require('./wordle/index.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');

const vars = process.env;
const token  = vars.TOKEN;

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const rest = new REST({ version: '9' }).setToken(vars.TOKEN);

/* 
---------------------------------- REGISTER COMMANDS ---------------------------------
*/

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.data.name, command);
}

client.once('ready', () => {
  console.log('Ready!');
})

client.on('interactionCreate', async interaction => {
    if(!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if(!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.log(error);
        await interaction.reply({ 
            content: 'There was an error executing this command!',
            ephemeral: true 
        });
    }
})

client.login(token);