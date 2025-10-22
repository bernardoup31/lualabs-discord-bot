const { Events, GuildMember} = require('discord.js');

module.exports = {
	name: Events.GuildMemberAdd,
	/**
	 * @param {GuildMember} member
	 */
	async execute(member) {
		const channelId = '1425200538567442655';
		const roleId= '1425196295647264828';
		const role = member.guild.roles.cache.get(roleId);
		const channel = member.guild.channels.cache.get(channelId);
		if (!channel) {
            console.log(`Channel ${channelId} not found in guild ${member.guild.id}`);
            return;
        }
		if (!role) {
			console.log(`Role ${roleId} not found in guild ${member.guild.id}`);
			return;
		}
		await member.roles.add(role);
		await channel.send(`🎉 Welcome to the server, ${member.user}! We hope you have fun!`);
	},
};