const { PermissionsBitField, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: {
        name: 'create_ticket', // customId do botão
    },

    /**
     * @param {ButtonInteraction} interaction
     */
    async execute(interaction) {
        const user = interaction.user;
        const guild = interaction.guild;
        const bot = guild.members.me;

        // Defer reply to avoid "This interaction failed" message
        await interaction.deferReply({ ephemeral: true });

        // Normalize the channel name, some characters in usernames might not be allowed in channel names
        const username = user.username.toLowerCase().replace(/[^a-z0-9]/g, '-');
        const channelName = `ticket-${username}`;

        // Check if user already has an open ticket
        let existingChannel;
        try {
            const channels = await guild.channels.fetch();
            existingChannel = channels.find(c => c.name === channelName);
        } catch {
            existingChannel = null;
        }

        if (existingChannel) {
            return interaction.editReply({
                content: '⚠️ You already have an open ticket.',
            });
        }

        // IDs das roles e categoria
        const moderatorRoleId = '1425196641547452608';
        const ticketCategoryId = '1428490226074124439';

        try {
            const ticketChannel = await guild.channels.create({
                name: channelName,
                type: ChannelType.GuildText,
                parent: ticketCategoryId,
                permissionOverwrites: [
                    {
                        id: user.id,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                    },
                    {
                        id: moderatorRoleId,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                    },
                    {
                        id: bot.id,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                    },
                    {
                        id: guild.roles.everyone.id,
                        deny: [PermissionsBitField.Flags.ViewChannel],
                    },
                ],
            });

            await ticketChannel.send(`Hello <@${user.id}>, please describe your issue and a moderator will be with you shortly.`);

            await interaction.editReply({
                content: `✅ Your ticket has been created: <#${ticketChannel.id}>`,
            });
        } catch (err) {
            console.error('Error creating ticket:', err);
            await interaction.editReply({
                content: '❌ There was an error creating your ticket.',
            });
        }
    },
};
