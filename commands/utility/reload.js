const { SlashCommandBuilder } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('Reloads a command.')
		.addStringOption((option) => option.setName('command').setDescription('The command to reload.').setRequired(true)),
	async execute(interaction) {
		const commandName = interaction.options.getString('command', true).toLowerCase();
		const command = interaction.client.commands.get(commandName);
		if (!command) {
			return interaction.reply(`There is no command with name \`${commandName}\`!`);
		}

        const commandPath = command.path;
		if (!commandPath) {
			return interaction.reply(`No file path was stored for command \`${commandName}\`.`);
		}

        delete require.cache[require.resolve(commandPath)];
        try {
            const newCommand = require(commandPath);
            newCommand.path = commandPath;
            interaction.client.commands.set(newCommand.data.name, newCommand);
            console.log("Suiiii");
            await interaction.reply(`Command \`${newCommand.data.name}\` was reloaded!`);
        } catch (error) {
            console.error(error);
            await interaction.reply(
                `There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``,
            );
        }
    },
};