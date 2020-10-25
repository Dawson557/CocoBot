import Discord from "discord.js";
import ChannelIds from "../config/ChannelIds";
import CourseCodePrefixes from "../config/CourseCodePrefixes";
import MiscChannels from "../config/MiscChannels";
import CommandParameters from "../lib/CommandParameters";

export default abstract class Utils {
    public static isCommandUsedInAppropriateChannel(channel: Discord.TextChannel | Discord.DMChannel): boolean {
        return channel && Object.values(ChannelIds).map((e) => e as string).includes(channel.id);
    }

    public static validateArguments(actualArguments: string[], ...expectedArgumentPredicates: ((arg: string) => boolean)[]): void {
        for (let i = 0; i < expectedArgumentPredicates.length; i += 1) {
            const expectedArgumentPredicate = expectedArgumentPredicates[i];
            const actualArgument = actualArguments[i];
            if (!actualArgument) {
                throw new Error(`Missing argument, argument at position ${i} must satisfy ${expectedArgumentPredicate},`);
            }
            if (!actualArgument || !expectedArgumentPredicate(actualArgument)) {
                throw new Error(`Bad argument, argument \`${actualArgument}\` must satisfy ${expectedArgumentPredicate}, but it did not.`);
            }
        }
    }

    public static addMemberToChannel(channel: Discord.GuildChannel, member: Discord.GuildMember): Promise<Discord.GuildChannel> {
        return channel.updateOverwrite(member, {
            READ_MESSAGE_HISTORY: true,
            SEND_MESSAGES: true,
            VIEW_CHANNEL: true,
        });
    }

    public static removeMemberFromChannel(channel: Discord.GuildChannel, member: Discord.GuildMember): Promise<Discord.PermissionOverwrites> | undefined {
        return channel.permissionOverwrites.get(member.id)?.delete();
    }

    public static isMemberAlreadyInChannel(channel: Discord.GuildChannel, member: Discord.GuildMember): boolean {
        return channel.permissionOverwrites.array().first((e) => e.id === member.id) !== undefined;
    }

    public static randomColor(): number {
        return Math.floor(Math.random() * 16777214) + 1;
    }

    public static createCommandParametersFromMessage(
        message: Discord.Message,
        lowerCaseArgsFlag = true,
    ): CommandParameters {
        let msgContent = message.content;
        const prefix = msgContent.charAt(0);
        const cmd = msgContent.slice(1).split(" ")[0].toLowerCase();
        // eslint-disable-next-line prefer-named-capture-group
        const quotedArgs = msgContent.match(/"(.*?)"/g);
        let args = quotedArgs ? Array.from(quotedArgs).map((e) => e) : [];
        // Remove quoted args from `msgContent` since it was added to `args`
        for (const arg of args) {
            msgContent = msgContent.replace(arg, "");
        }
        // Remove unnecessary quotes around any args
        args = args.map((e) => e.replace(/"/g, "")); // Remove quotes around any arg
        // Trim around `msgContent` that might be needed
        msgContent = msgContent.trim();
        // Parse the remaining args by first removing any extra spaces and commas
        args.push(...Utils
            .removeExtraSpacesAndAllCommasFromString(msgContent.slice(1))
            .split(" ")
            .slice(1));

        // If lower case args is desired
        if (lowerCaseArgsFlag) { args = args.map((e) => e.toLowerCase()); }

        return {
            prefix,
            cmd,
            args,
        };
    }

    public static removeExtraSpacesAndAllCommasFromString(str: string): string {
        return str.replace(/,/g, " ").replace(/\s{2,}/g, " ");
    }

    public static getCourseChannelPrefixes(): string[] {
        return Object.keys(CourseCodePrefixes).map(Utils.lowerCaseDashTransform);
    }

    public static getMiscChannelNames(): string[] {
        return Object.values(MiscChannels);
    }

    public static async checkMemberHasAgreedToRules(member: Discord.GuildMember): Promise<void> {
        const { roles } = member;
        const memberRoles = roles.array().filter((role) => role.name === "Members");
        if (memberRoles.length === 0) {
            const rulesChannel = Utils.getChannels(member.guild).first((channel) => channel.id === ChannelIds.RulesChannel);
            throw new Error(`> :poop: Oopsies :poop: Seems like you haven't agreed to the rules yet. Go to ${rulesChannel} and hit the :thumbsup: emoji after reading the rules first.`);
        }
    }

    public static async parseChannelManagementCommand(message: Discord.Message, params: CommandParameters): Promise<{channel: Discord.GuildChannel}> {
        if (message.member) {
            await this.checkMemberHasAgreedToRules(message.member);
        }

        const courseChannelPrefixes = Utils.getCourseChannelPrefixes();
        const miscChannelNames = Utils.getMiscChannelNames();

        const desiredChannelName = params.args[0].toLowerCase();

        const isValidCmd = courseChannelPrefixes.some((e) => desiredChannelName.startsWith(e)) || miscChannelNames.some((e) => e === desiredChannelName);

        if (!isValidCmd) { throw new Error("> :poop: Oopsies :poop: That is not a valid option."); }

        const { channels } = message.guild || {};

        if (!channels) { throw new Error("> Sadly something went wrong when trying to get the server channels. @MODS 👑, help!"); }

        const channel = channels
            .filter((e) => e !== undefined)
            .filter((e) => e.name.toLowerCase() === desiredChannelName)
            .first();

        if (!channel) { throw new Error(`> :poop: Oopsies :poop: Sadly no channel was found with the name ${desiredChannelName}. Tag a mod \`@mod\` if you would like to have it created.`); }

        return {
            channel,
        };
    }

    public static joinValues(obj: object, separator: string = ", ", transform: (value: string) => (string) = (value: string): string => value): string {
        return Object.values(obj).map(transform).join(separator);
    }

    public static joinKeys(obj: object, separator: string = ", ", transform: (key: string) => (string) = (key: string): string => key): string {
        return Object.keys(obj).map(transform).join(separator);
    }

    public static lowerCaseDashTransform = (value: string): string => `${value.toLowerCase()}-`;

    public static groupBy<K, E>(items: E[], keyResolver: (item: E) => K): Map<K, E[]> {
        const map = new Map<K, E[]>();
        for (const item of items) {
            const key = keyResolver(item);
            const keyedItems = map.get(key);
            if (!keyedItems) {
                map.set(key, [item]);
            } else {
                keyedItems.push(item);
            }
        }
        return map;
    }

    public static startsWithPrefixPredicate = (str: string, prefix: string): boolean => str.startsWith(prefix);

    public static startsWithAnyPrefixPredicate = (str: string, prefixes: string[]): boolean => prefixes.some((prefix) => Utils.startsWithPrefixPredicate(str, prefix));

    public static isAnyOfPredicate<T, E>(things: T[], transform: (item: E) => (T)): (thing: E) => boolean {
        return (thing: E): boolean => things.some((e) => e === transform(thing));
    }

    public static mapToNameTransform<T extends { name: string }>(): (thing: T) => string {
        return (thing: T): string => thing.name;
    }

    public static getChannels(guild: Discord.Guild | null): Discord.GuildChannel[] {
        const { channels } = guild || {};

        if (!channels) { throw new Error("> Sadly something went wrong when trying to get the server channels. @MODS 👑, help!"); }

        return channels.array();
    }

    public static getCourseChannels(guild: Discord.Guild | null): Discord.GuildChannel[] {
        const channels = Utils.getChannels(guild);

        const courseChannelPrefixes = Object.keys(CourseCodePrefixes).map(Utils.lowerCaseDashTransform);

        const startsWithCourseChannelPrefixPredicate = (str: string): boolean => Utils.startsWithAnyPrefixPredicate(str, courseChannelPrefixes);

        const courseChannels: Discord.GuildChannel[] = channels.filter((channel): boolean => startsWithCourseChannelPrefixPredicate(channel.name));

        return courseChannels;
    }

    public static getMiscChannels(guild: Discord.Guild | null): Discord.GuildChannel[] {
        const channels = Utils.getChannels(guild);

        const miscChannelNames = Object.values(MiscChannels).map((e) => e.toLowerCase());

        return channels.filter(Utils.isAnyOfPredicate(miscChannelNames, Utils.mapToNameTransform()));
    }

    public static getAvailableChannels(guild: Discord.Guild | null): Discord.GuildChannel[] {
        const courseChannels = Utils.getCourseChannels(guild);
        const miscChannels = Utils.getMiscChannels(guild);
        return [...courseChannels, ...miscChannels];
    }

    public static displayCourseCodePrefixes(): string {
        return Utils.joinKeys(CourseCodePrefixes, ", ", Utils.lowerCaseDashTransform);
    }

    public static getFormattedCourseChannels(guild: Discord.Guild | null): string[] {
        const courseChannels = Utils.getCourseChannels(guild);

        const courseChannelNames: string[] = courseChannels.map((channel) => channel.name);

        const channelNamesGroupedByCode = Utils.groupBy(courseChannelNames, (item: string): string => item.substring(0, 4));

        const extractCourseCodeNumber = (courseCode: string): string => {
            const extractedNumber = courseCode.match(/[a-zA-Z]{4}-(.*)/);
            return extractedNumber ? extractedNumber[1] : "";
        };

        const extractNumberAndUpperCase = (e: string): string => extractCourseCodeNumber(e).toUpperCase();

        const formattedCourseChannelsText = Array.from(channelNamesGroupedByCode.entries())
            .sort()
            .map(([courseCodePrefix, channelNames]: [string, string[]]): string => `> **${courseCodePrefix.toUpperCase()}**: ${channelNames.sort().map(extractNumberAndUpperCase).join(", ")}`);

        return formattedCourseChannelsText;
    }

    public static displayMiscChannels(guild: Discord.Guild | null): string {
        const miscChannels = Utils.getMiscChannels(guild);

        return `> **OTHER**: ${miscChannels.map((e) => e.name).join(", ")}`;
    }

    public static displayAvailableChannels(guild: Discord.Guild | null): string[] {
        const formattedCourseChannels = ["> **The possible course channels to join are:**\n",
            ...Utils.getFormattedCourseChannels(guild),
            Utils.displayMiscChannels(guild)];
        const availableChannelMultiPartMessages = Utils.partitionAtIndices(formattedCourseChannels, Utils.getPartitionIndices(formattedCourseChannels, 1500));

        return availableChannelMultiPartMessages.map((e) => e.join("\n"));
    }

    public static getPartitionIndices(elements: string[], charLimit: number): number[] {
        let count = 0;
        return elements.reduce((indices: number[], element, index) => {
            count += element.length;
            if (count >= charLimit) {
                count = element.length;
                return [...indices, index];
            }

            return indices;
        }, []);
    }

    private static partitionAtIndices<T>(elements: T[], indices: number[]): T[][] {
        const partitions: T[][] = [];
        let previousPartitionIndex = 0;
        for (const partitionIndex of indices) {
            partitions.push(elements.slice(previousPartitionIndex, partitionIndex));
            previousPartitionIndex = partitionIndex;
        }
        partitions.push(elements.slice(previousPartitionIndex, elements.length));

        return partitions;
    }
}
