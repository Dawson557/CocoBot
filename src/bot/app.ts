import Client from "../lib/Client";

new Client({
    name: "coco",
    runIn: [ "dev-channel" ],
    appDirName: __dirname,
    discordOptions: {
        fetchAllMembers: true,
        partials: [ "MESSAGE", "CHANNEL" ]
    }
}).start();