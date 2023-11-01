import { program } from "commander";
import TelegramBot from "node-telegram-bot-api/lib/telegram.js";

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

program
    .command('message')
    .alias('m')
    .alias('send-message')
    .argument('<message>')
    .action(async function () {
        await sendText(this.args[0]);
        console.log('\nYou have succesfully sent a text message\n');
        terminateApp();
    });

program
    .command('photo')
    .alias('p')
    .alias('send-photo')
    .argument('<image-path>')
    .action(async function () {
        await sendImage(this.args[0]);
        console.log('\nYou have succesfully sent an image\n');
        terminateApp();
    });

program.parse();

async function sendText(message) {
    await bot.sendMessage(process.env.CHAT_ID, message);
}
async function sendImage(imagePath) {
    await bot.sendPhoto(process.env.CHAT_ID, imagePath);
}
function terminateApp() {
    process.exit(0);
}
