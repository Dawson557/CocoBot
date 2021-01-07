import Discord from "discord.js";
import runnerConfig from "../../config/runner";
import Command from "../../lib/Command";
import CommandParameters from "../../lib/CommandParameters";
import Utils from "../../util/Utils";
import config from "../../config/config";

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

            if (Utils.isMemberAlreadyInChannel(channel, member)) {
                await message.channel.send(`> :white_check_mark: No problem, ${message.member}! You already have access to ${channel}.`);
                return;
            }

            await Utils.addMemberToChannel(channel, member);

            await message.channel.send(`> :white_check_mark: Got it! Gave ${message.member} access to ${channel}.`);

            const destinationChannel = channel as Discord.TextChannel;

            const joinedAlertSuffix = "joined the chat.";

            // Ensure last message by Coco and was involving a joined alert.
            if (destinationChannel.lastMessage
                && destinationChannel.lastMessage.author?.id === config.coco.clientId
                && destinationChannel.lastMessage.content.includes(joinedAlertSuffix)) {
                const { lastMessage } = destinationChannel;
                const lastMessageMemberMentions = lastMessage.mentions.members;

                // Already processed in previous message, no need to add again.
                if (message.member && lastMessageMemberMentions?.array().includes(message.member)) {
                    return;
                }

                // If collection is somehow empty, fallback to new alert message (don't return).
                if (lastMessageMemberMentions
                    && lastMessageMemberMentions.size > 0) {
                    const joinedMembers = [...lastMessageMemberMentions
                        .array(), message.member]
                        .reduce((content, memberMention, index) => (index === 0 ? `${content}${memberMention}` : `${content}, ${memberMention}`), "");
                    await lastMessage.edit(`*${joinedMembers} ${joinedAlertSuffix}*`);
                    return;
                }
            }

            // Fallback to new alert message
            await destinationChannel?.send(`*${message.member} ${joinedAlertSuffix}*`);
        } catch (error) {
            await message.channel.send(error.message);
            await this.log.error(error);
            if (Utils.isCommandUsedInAppropriateChannel(message.channel)) { await this.help(message.channel as Discord.TextChannel); }
        }
    }
}
