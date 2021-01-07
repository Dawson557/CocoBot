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
        TestServerDevChannel: process.env.TEST_SERVER_DEV_CHANNEL as string,
        RulesChannel: process.env.RULES_CHANNEL as string,
    },
};
