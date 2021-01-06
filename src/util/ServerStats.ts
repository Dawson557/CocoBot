import Discord from "discord.js";

export default class ServerStats {
    channelCount: number;

    memberCount: number;

    botCount: number;

    roleCount: number;

    constructor(guild: Discord.Guild | null) {
        this.channelCount = guild?.channels.size ?? -1;
        this.memberCount = guild?.members.size ?? -1;
        this.botCount = guild?.members.filter((member) => member.user.bot).size ?? -1;
        this.roleCount = guild?.roles.size ?? -1;
    }

    stringify(): string {
        return `> **SERVER STATS:** 
> Channels: ${this.channelCount}
> Members: ${this.memberCount}
> Bots: ${this.botCount}
> Roles: ${this.roleCount}
`;
    }
}
