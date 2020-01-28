import Discord from "discord.js";
import runnerConfig from "../../config/runner";
import Command from "../../lib/Command";
import CommandParameters from "../../lib/CommandParameters";

export enum CourseCodePrefixes {
    comp = "comp-",
    engr = "engr-",
    soen = "soen-"
}

export default class extends Command {
    public constructor() {
        super(runnerConfig.command.ls);
    }

    public async run(message: Discord.Message, params: CommandParameters): Promise<void> {
        try {
            const channels = message.guild?.channels;

            if (!channels) { throw new Error("> Sadly something went wrong when trying to get the server channels. @MODS 👑, help!"); }

            const courseChannels = channels
                .filter(e => e !== undefined)
                .filter(e => Object.values(CourseCodePrefixes).some(ee => e.name.startsWith(ee)));

            await message.channel.send(`> The possible course channels to join are:\n> ${courseChannels.reduce((str, e) => str === "" ? `${e.name}`: `${str}, ${e.name}`, "")}`);
        } catch (error) {
            await message.channel.send(error.message);
            await this.log.error(error);
            await this.help(message.channel as Discord.TextChannel);
        }
    }
}
