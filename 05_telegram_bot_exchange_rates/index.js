import TelegramBot from "node-telegram-bot-api/lib/telegram.js";
import axios, { isCancel, AxiosError } from 'axios';
import NodeCache from "node-cache";

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
let myChache = new NodeCache({stdTTL: 300, checkperiod: 100});

getExchangeRates();

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Welcome", {
        "reply_markup": {
            "keyboard": [["Exchange rates"]]
        }
    });
});
bot.on('message', async (msg) => {
    if (msg.text == "Exchange rates") {
        bot.sendMessage(msg.chat.id, "Welcome", {
            "reply_markup": {
                "keyboard": [["USD"], ["EUR"], ["Back"]]
            }
        });
    }
    if (msg.text == "USD") {
            bot.sendMessage(msg.chat.id, `This is current exchange rate for USD: Buy ${myChache.get("usd").usdRateBuy} Sell ${myChache.get("usd").usdRateSell}`);
    }
    if (msg.text == "EUR") {
            bot.sendMessage(msg.chat.id, `This is current exchange rate for USD: Buy ${myChache.get("eur").eurRateBuy} Sell ${myChache.get("eur").eurRateSell}`);
    }
});
async function getExchangeRates() {
    let data = await axios.get(`https://api.monobank.ua/bank/currency`);
    let arr = [{   //just making it clear
        usdRateBuy: data.data[0].rateBuy,
        usdRateSell: data.data[0].rateSell,
    },
    {
        eurRateBuy: data.data[1].rateBuy,
        eurRateSell: data.data[1].rateSell,
    }];
    myChache.mset([
        {key: "usd", val: arr[0]},
        {key: "eur", val: arr[1]},
    ]);
    console.log(myChache);
}
// 978 EUR     840 USD   980 UAH
myChache.on("expired", async (key, value) => {
    await getExchangeRates();
});
