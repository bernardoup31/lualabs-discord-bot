const { SlashCommandBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('send-ticket-message')
    .setDescription('Creates the ticket message in the specified channel (only for admins).')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const channel = interaction.channel; 

        if (!channel) {
            return interaction.reply({
                content: '❌ Ticket channel not found. Please check the channel ID.',
                ephemeral: true,
            });
        }

        const messages = await channel.messages.fetch({ limit: 1 });

        if (messages.size > 0) {
            return interaction.reply({
                content: '⚠️ This channel already has a message, so the ticket message will not be sent again.',
                ephemeral: true,
            });
        }

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('create_ticket')
                .setLabel('🎫 Create Ticket')
                .setStyle(ButtonStyle.Primary)
        );

        await channel.send({
            content: 'Need help? Click the button below to open a support ticket!',
            components: [row],
        });

        await interaction.reply({
            content: `✅ Ticket creation message sent and pinned in <#${ticketChannelId}>.`,
            ephemeral: true,
        });

    },
};