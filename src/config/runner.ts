import CommandConfig from "../lib/CommandConfig";
import MessageIds from "./MessageIds";

const ping: CommandConfig = {
    name: "ping",
    enabled: true,
    runIn: [
        "dev-channel"
    ],
    description: "",
    aliases: [],
    lowerCaseArgs: false,
    template: "",
    helpMessageInfo: {
        messageId: MessageIds.PingCommandTemplate,
        channelName: "dev-channel",
        categoryName: "Admin Channels"
    }
};

const commandConfigs = {
    ping
};

export default {
    command: commandConfigs
};