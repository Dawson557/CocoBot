import Discord from "discord.js";
import MessageIds from "../../config/MessageIds";
import runnerConfig from "../../config/runner";
import Command from "../../lib/Command";
import CommandParameters from "../../lib/CommandParameters";

export default class extends Command {
    public constructor() {
        super(runnerConfig.command.help);
    }

    public async run(message: Discord.Message, _params: CommandParameters): Promise<void> {
        try {
            const helpMsg = await this.helper.getMessageById({
                messageId: MessageIds.HelpCommandMessage,
                categoryName: "Admin Channels",
                channelName: "dev-channel",
            });
            await message.channel.send(helpMsg);
        } catch (error) {
            await message.channel.send(error.message);
            await this.log.error(error);
            await this.help(message.channel as Discord.TextChannel);
        }
    }
}
