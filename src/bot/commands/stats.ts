import Discord from "discord.js";
import runnerConfig from "../../config/runner";
import Command from "../../lib/Command";
import CommandParameters from "../../lib/CommandParameters";
import ServerStats from "../../util/ServerStats";
import Utils from "../../util/Utils";

export default class extends Command {
    public constructor() {
        super(runnerConfig.command.stats);
    }

    public async run(message: Discord.Message, _params: CommandParameters): Promise<void> {
        try {
            this.helper.checkCommandUsedInAppropriateChannel(message.channel);
            const stats = new ServerStats(message.guild);
            await message.channel.send(stats.stringify());
            message.client.user?.setActivity(`${stats.memberCount} members`);
        } catch (error) {
            await message.channel.send(error.message);
            await this.log.error(error);
            if (Utils.isCommandUsedInAppropriateChannel(message.channel)) { await this.help(message.channel as Discord.TextChannel); }
        }
    }
}
