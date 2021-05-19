# Lex chat bot client

This is a sample chatbot client which is using the AWS Lex service. It is a simple node js implementation which defines a terminal to interact with the bot.

# Installation
To install the project, clone it with
```bash
$ git clone https://github.com/sis-labs/lex-chat-terminal.git
```
The go on the project
```bash
$ cd lex-chat-terminal
```
And run
```bash
$ node index.js
```

# Configuration
In order to configure the bot, you must define a Lex Bot. Then, you have to setup the bot configuration in a `.env` file.
```bash
# .env content
AWS_KEY=<your aws key>
AWS_SECRET=<your aws secret>
AWS_REGION=<aws region for the bot>
BOT_NAME=<lex bot name>
BOT_ALIAS=<lex bot alias>
USER_ID=<id of the user in the session>
```

# Notes
The code is very basic and no instrumentaion has been made on it.
Bot message are simply readed from the lex api and printed on the stdout without handling meta data.

