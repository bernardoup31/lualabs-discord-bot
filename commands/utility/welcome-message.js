const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('lima').setDescription('Replies something!'),
	async execute(interaction) {
		await interaction.reply('is gay and corno and burro and esteio!');
	},
};