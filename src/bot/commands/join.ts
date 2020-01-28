import Discord from "discord.js";
import runnerConfig from "../../config/runner";
import Command from "../../lib/Command";
import CommandParameters from "../../lib/CommandParameters";

export default class extends Command {
    public constructor() {
        super(runnerConfig.command.join);
    }

    public async run(message: Discord.Message, params: CommandParameters): Promise<void> {
        try {
            const { role, channelDesiredName } = await this.helper.parseCourseRoleManagementCommand(message, params);
            await message.member?.roles.add(role);
            await message.channel.send(`> Got it! Gave ${message.member} access to ${channelDesiredName}.`);
        } catch (error) {
            await message.channel.send(error.message);
            await this.log.error(error);
            await this.help(message.channel as Discord.TextChannel);
        }
    }
}