import Discord, { GuildMember } from "discord.js";
import runnerConfig from "../../config/runner";
import Command from "../../lib/Command";
import CommandParameters from "../../lib/CommandParameters";
import Utils from "../../util/Utils";

export default class extends Command {
    public constructor() {
        super(runnerConfig.command.count);
    }

    public async run(message: Discord.Message, params: CommandParameters): Promise<void> {
        try {
            this.helper.checkCommandUsedInAppropriateChannel(message.channel);

            const defaultPeriod = "days";
            const defaultPeriodLength = "7";

            let [period, periodLength] = params.args;

            if (params.args.isEmpty()) {
                period = defaultPeriod;
                periodLength = defaultPeriodLength;
            } else {
                Utils.validateArguments(params.args,
                    (arg: string) => arg.toLowerCase() === defaultPeriod,
                    (arg: string) => !!Number(arg));
            }

            const startDateSinceNewMembers = new Date();

            if (period === defaultPeriod) {
                startDateSinceNewMembers.setDate(startDateSinceNewMembers.getDate() - Number(periodLength));
            }

            const compare = (member : GuildMember): boolean => {
                if (member?.joinedAt?.toTimeString()) {
                    return member.joinedAt > startDateSinceNewMembers;
                }
                return false;
            };

            const count = message.guild?.members.filter(compare);

            message.channel.send(`${count?.size} new members in last ${periodLength} ${period}`);
        } catch (error) {
            await message.channel.send(error.message);
            await this.log.error(error);
            if (Utils.isCommandUsedInAppropriateChannel(message.channel)) { await this.help(message.channel as Discord.TextChannel); }
        }
    }
}
