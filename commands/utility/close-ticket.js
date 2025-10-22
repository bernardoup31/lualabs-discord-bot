const { SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('close-ticket')
    .setDescription('Closes the ticket channel.'),
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const channel = interaction.channel;

        const ticketOwnerId = channel.name.split('ticket-')[1];
        const isOwner = interaction.user.id === ticketOwnerId;
        const isAdmin = interaction.member.permissions.has(PermissionFlagsBits.ManageChannels);

        if (!isOwner && !isAdmin) {
            return interaction.reply({
                content: '❌ Only the ticket owner or a moderator can close this ticket.',
                ephemeral: true,
            });
        }

        if (channel.name.startsWith('ticket-')) {
            await channel.delete();
        } else {
            await interaction.reply({
                content: '❌ This command can only be used in ticket channels.',
                ephemeral: true,
            });
        }
    },
};