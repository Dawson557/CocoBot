import Discord from "discord.js";
import runnerConfig from "../../config/runner";
import Command from "../../lib/Command";
import CommandParameters from "../../lib/CommandParameters";
import Utils from "../../util/Utils";

export default class extends Command {
    public constructor() {
        super(runnerConfig.command.sort);
    }

    public async run(message: Discord.Message, params: CommandParameters): Promise<void> {
        try {
            this.helper.checkCommandUsedInAppropriateChannel(message.channel);
            if (params.args.length === 0) { throw new Error("Must provide a category name"); }
            const categoryName = params.args[0];
            const categoryId = this.helper.getCategoryIdForName(categoryName);
            if (!categoryId) { throw new Error("Could not find that category name"); }

            const channels = this.helper.getChannelsForCategoryId(categoryId);
            const sorted = channels.sort((a, b) => {
                if (a.name.endsWith("general")) {
                    return -1;
                }

                if (b.name.endsWith("general")) {
                    return 1;
                }

                return a.name.localeCompare(b.name);
            });

            await message.channel.send(`Sorting for ${categoryName} category started, please wait...`);
            for (let i = 0; i < sorted.length; i += 1) {
                // eslint-disable-next-line no-await-in-loop
                await sorted[i].setPosition(i);
            }
            await message.channel.send(`Sorting for ${categoryName} category completed!`);
        } catch (error) {
            await message.channel.send(error.message);
            await this.log.error(error);
            if (Utils.isCommandUsedInAppropriateChannel(message.channel)) { await this.help(message.channel as Discord.TextChannel); }
        }
    }
}
