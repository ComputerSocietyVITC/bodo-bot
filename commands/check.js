const { SlashCommandBuilder } = require('@discordjs/builders')

const data = new SlashCommandBuilder()
            .setName('echo')
	        .setDescription('Replies with your input!')
	        .addStringOption(option =>
		        option.setName('input')
			        .setDescription('The input to echo back')
			        .setRequired(true))

module.exports = {
    data: data,
    async execute(interaction) {
        console.log(interaction.toJSON());
        await interaction.reply(`Checked ${interaction.options.getString('input')}`);
    } 
}