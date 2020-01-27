# CocoBot
A bot to help manage the course assignations for Concordia's ENGR discord server.

# Invite Bot
```
https://discordapp.com/oauth2/authorize?client_id=671406438249398311&scope=bot
```

# Contributing
Take the `.vscode/launch.json.template` file and copy its content into a new file `.vscode/launch.json`. Then replace the value of the `"BOT_TOKEN"` to the bot's token. This will allow you to head over into VSCode and run the debug launch task called `CocoBot` to allow you to develop locally (it will start the bot on your machine so that your code can be reflected in a new and separate bot instance -- i.e. both the Heroku deployed one will still run, but the local one will run too for testing).

**WARNING: NEVER EVER PUSH THE TOKEN ON GITHUB, I HAVE MADE `.vscode/launch.json` BE IGNORED BY GIT, BUT DON'T SLIP UP AND UPLOAD IT IN SOME OTHER FILE!**