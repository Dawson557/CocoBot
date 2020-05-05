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
        messageId: MessageIds.LsCommandTemplate,
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
};

export default {
    command: commandConfigs,
};
