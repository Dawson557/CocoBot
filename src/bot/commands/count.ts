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
            
            const [period, periodLen] = params.args;

            let dateToReturn = new Date();

            if(period === "days"){
                dateToReturn.setDate(dateToReturn.getDate() - Number(periodLen))
            }


            const compare = (member : GuildMember) => {
                if(member?.joinedAt?.toTimeString()){
                    return member.joinedAt > dateToReturn
                }else{
                    return false
                }
            }

            const count = message.guild?.members.filter(compare)
            
            message.channel.send(`${count?.size} New members in last ${periodLen} ${period}`)

        } catch (error) {
            await message.channel.send(error.message);
            await this.log.error(error);
            if (Utils.isCommandUsedInAppropriateChannel(message.channel)) { await this.help(message.channel as Discord.TextChannel); }
        }
    }
}

