export default {
    guildId: process.env.GUILD_ID as string,
    rootDirPath: process.cwd(),
    cmdPrefix: "$",
    coco: {
        clientId: process.env.CLIENT_ID,
        botToken: process.env.BOT_TOKEN,
    },
    channelIds: {
        AdminChannel: process.env.ADMIN_CHANNEL as string,
        DevChannel: process.env.DEV_CHANNEL as string,
        BotRequestChannel: process.env.BOT_REQUESTS_CHANNEL as string,
        RulesChannel: process.env.RULES_CHANNEL as string,
    },
    MessageIds: {
        PingCommandTemplate: process.env.PING_COMMAND_TEMPLATE as string,
        JoinCommandTemplate: process.env.JOIN_COMMAND_TEMPLATE as string,
        LeaveCommandTemplate: process.env.LEAVE_COMMAND_TEMPLATE as string,
        LsCommandTemplate: process.env.LS_COMMAND_TEMPLATE as string,
        HelpCommandMessage: process.env.HELP_COMMAND_TEMPLATE as string,
        StatsCommandTemplate: process.env.STATS_COMMAND_TEMPLATE as string,
        EchoCommandTemplate: process.env.ECHO_COMMAND_TEMPLATE as string,
        SortCommandTemplate: process.env.SORT_COMMAND_TEMPLATE as string,
        CountCommandTemplate: process.env.COUNT_COMMAND_TEMPLATE as string,
    },
    MiscChannels: {
        // empty for now, used to be coop ids
    },
};
