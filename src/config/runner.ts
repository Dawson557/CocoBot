import CommandConfig from "../lib/CommandConfig";
import MessageIds from "./MessageIds";

const ping: CommandConfig = {
    name: "ping",
    enabled: true,
    runIn: ["all"],
    description: "",
    aliases: [],
    lowerCaseArgs: false,
    template: "",
    helpMessageInfo: {
        messageId: MessageIds.PingCommandTemplate,
        channelName: "dev-channel",
        categoryName: "Admin Channels",
    },
};

const join: CommandConfig = {
    name: "join",
    enabled: true,
    runIn: ["all"],
    description: "",
    aliases: [],
    lowerCaseArgs: false,
    template: "",
    helpMessageInfo: {
        messageId: MessageIds.JoinCommandTemplate,
        channelName: "dev-channel",
        categoryName: "Admin Channels",
    },
};

const leave: CommandConfig = {
    name: "leave",
    enabled: true,
    runIn: ["all"],
    description: "",
    aliases: [],
    lowerCaseArgs: false,
    template: "",
    helpMessageInfo: {
        messageId: MessageIds.LeaveCommandTemplate,
        channelName: "dev-channel",
        categoryName: "Admin Channels",
    },
};

const ls: CommandConfig = {
    name: "ls",
    enabled: true,
    runIn: ["all"],
    description: "",
    aliases: ["list"],
    lowerCaseArgs: false,
    template: "",
    helpMessageInfo: {
        messageId: MessageIds.LsCommandTemplate,
        channelName: "dev-channel",
        categoryName: "Admin Channels",
    },
};

const help: CommandConfig = {
    name: "help",
    enabled: true,
    runIn: ["all"],
    description: "",
    aliases: ["?"],
    lowerCaseArgs: false,
    template: "",
    helpMessageInfo: {
        messageId: MessageIds.HelpCommandMessage,
        channelName: "dev-channel",
        categoryName: "Admin Channels",
    },
};

const stats: CommandConfig = {
    name: "stats",
    enabled: true,
    runIn: ["admin", "dev-channel"],
    description: "",
    aliases: ["stat"],
    lowerCaseArgs: false,
    template: "",
    helpMessageInfo: {
        messageId: MessageIds.StatsCommandTemplate,
        channelName: "dev-channel",
        categoryName: "Admin Channels",
    },
};

const echo: CommandConfig = {
    name: "echo",
    enabled: true,
    runIn: ["admin", "dev-channel"],
    description: "",
    aliases: [],
    lowerCaseArgs: false,
    template: "",
    helpMessageInfo: {
        messageId: MessageIds.EchoCommandTemplate,
        channelName: "dev-channel",
        categoryName: "Admin Channels",
    },
};

const commandConfigs = {
    ping,
    join,
    leave,
    ls,
    help,
    stats,
    echo,
};

export default {
    command: commandConfigs,
};
