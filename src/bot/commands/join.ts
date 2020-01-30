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
            const { channel } = await Utils.parseChannelManagementCommand(message, params);
            const { member } = message;

            if (!member) { throw new Error("> Sadly something went wrong when trying to get the member. @MODS 👑, help!"); }

            await channel.updateOverwrite(member, {
                READ_MESSAGE_HISTORY: true,
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true,
            });

            await message.channel.send(`> Got it! Gave ${message.member} access to ${channel.name}.`);
        } catch (error) {
            await message.channel.send(error.message);
            await this.log.error(error);
            await this.help(message.channel as Discord.TextChannel);
        }
    }
}
