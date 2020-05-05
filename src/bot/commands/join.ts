import Discord from "discord.js";
import runnerConfig from "../../config/runner";
import Command from "../../lib/Command";
import CommandParameters from "../../lib/CommandParameters";
import Utils from "../../util/Utils";

export default class extends Command {
    public constructor() {
        super(runnerConfig.command.join);
    }

    public async run(message: Discord.Message, params: CommandParameters): Promise<void> {
        try {
            this.helper.checkCommandUsedInAppropriateChannel(message.channel);
            const { channel } = await Utils.parseChannelManagementCommand(message, params);
            const { member } = message;

            if (!member) { throw new Error("> :no_entry: Ah-ohh :no_entry: Sadly something went wrong when trying to get the member. @MODS 👑, help!"); }

            await Utils.addMemberToChannel(channel, member);

            await message.channel.send(`> :white_check_mark: Got it! Gave ${message.member} access to ${channel.name}.`);
        } catch (error) {
            await message.channel.send(error.message);
            await this.log.error(error);
            if (Utils.isCommandUsedInAppropriateChannel(message.channel)) { await this.help(message.channel as Discord.TextChannel); }
        }
    }
}
