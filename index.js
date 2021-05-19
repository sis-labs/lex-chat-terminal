require('dotenv').config();
const chalk = require('chalk');
const LexRuntime = require('aws-sdk/clients/lexruntime');
const readline = require('readline');

const {
    AWS_KEY,
    AWS_SECRET,
    AWS_REGION,
    BOT_NAME,
    BOT_ALIAS,
    USER_ID,
} = process.env;

// AWS configuration
const key = AWS_KEY;
const secret = AWS_SECRET;
const region = AWS_REGION;

// lex bot configuration
const name = BOT_NAME;
const alias = BOT_ALIAS;
const userId = USER_ID;

// Lex runtime configuration
const opts = {
    accessKeyId: key,
    secretAccessKey: secret,
    region,
};

// terminal reader
const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
});

// lex runtime
const runtime = new LexRuntime(opts);

const sendMessage = (message) => new Promise((resolve, reject) => {
    runtime.postContent({
	botAlias: alias,
	botName: name,
	userId,
	contentType: 'text/plain; charset=utf-8',
	inputStream: message,
    }, (err, data) => {
	if(err) {
	    console.log(`An error occurred during the process ${err.message || err}`);
	    reject(err);
	} else {
	    console.log('ok');
	    resolve(data);
	}
    });
});

const readMessageContent = (data) => data.message;

const readUserMessage = async () => {
    const buff = fs.readFileSync(0);
    return buff.toString();
};

const exec = async (line) => {
    let msg = '';
    if(line === 'quit') {
	console.log(chalk.blue('Bye!'));
	process.exit(0);
    }
    const botResponse = await sendMessage(line);
    const botMessage = readMessageContent(botResponse);
    console.log(chalk.yellow(botMessage)); // Should use reader.question instead
};

const writePrompt = () => {
    process.stdout.write(chalk.white('> '));
};

reader.on('line', async (line) => {
    await exec(line);
    writePrompt();
});

writePrompt();
