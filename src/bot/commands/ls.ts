import Discord from "discord.js";
import runnerConfig from "../../config/runner";
import Command from "../../lib/Command";
import CommandParameters from "../../lib/CommandParameters";
import Utils from "../../util/Utils";

export default class extends Command {
    public constructor() {
        super(runnerConfig.command.ls);
    }

    public async run(message: Discord.Message, _params: CommandParameters): Promise<void> {
        try {
            this.helper.checkCommandUsedInAppropriateChannel(message.channel);
            const availableChannelsMultiPartMessages = Utils.displayAvailableChannels(message.guild);
            for (const availableChannelsMultiPartMessage of availableChannelsMultiPartMessages) {
                // eslint-disable-next-line no-await-in-loop
                await message.channel.send(availableChannelsMultiPartMessage);
            }
        } catch (error) {
            await message.channel.send(error.message);
            await this.log.error(error);
            if (Utils.isCommandUsedInAppropriateChannel(message.channel)) { await this.help(message.channel as Discord.TextChannel); }
        }
    }
}
