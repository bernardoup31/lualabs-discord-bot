const { Events } = require('discord.js');

module.exports = {
	name: Events.GuildMemberAdd,
	async execute(member) {
		const channelId = '1425200538567442655';
		const channel = member.guild.channels.cache.get(channelId);
		if (!channel) {
            console.log(`Channel ${channelId} not found in guild ${member.guild.id}`);
            return;
        }

		await channel.send(`🎉 Welcome to the server, ${member.user}! We hope you have fun!`);
	},
};