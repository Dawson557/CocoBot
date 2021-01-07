import CommandConfig from "../lib/CommandConfig";
import config from "./config";

const ping: CommandConfig = {
    name: "ping",
    enabled: true,
    runIn: ["all"],
    description: "",
    aliases: [],
    lowerCaseArgs: false,
    template: "",
    helpMessageInfo: {
        messageId: config.MessageIds.PingCommandTemplate,
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
        messageId: config.MessageIds.JoinCommandTemplate,
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
        messageId: config.MessageIds.LeaveCommandTemplate,
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
        messageId: config.MessageIds.LsCommandTemplate,
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
        messageId: config.MessageIds.HelpCommandMessage,
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
        messageId: config.MessageIds.StatsCommandTemplate,
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
        messageId: config.MessageIds.EchoCommandTemplate,
        channelName: "dev-channel",
        categoryName: "Admin Channels",
    },
};

const sort: CommandConfig = {
    name: "sort",
    enabled: true,
    runIn: ["admin", "dev-channel"],
    description: "",
    aliases: [],
    lowerCaseArgs: false,
    template: "",
    helpMessageInfo: {
        messageId: config.MessageIds.SortCommandTemplate,
        channelName: "dev-channel",
        categoryName: "Admin Channels",
    },
};

const count: CommandConfig = {
    name: "count",
    enabled: true,
    runIn: ["admin", "dev-channel"],
    description: "",
    aliases: [],
    lowerCaseArgs: false,
    template: "",
    helpMessageInfo: {
        messageId: config.MessageIds.CountCommandTemplate,
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
    sort,
    count,
};

export default {
    command: commandConfigs,
};
