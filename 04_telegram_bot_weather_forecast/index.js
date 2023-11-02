import TelegramBot from "node-telegram-bot-api/lib/telegram.js";
import axios, { isCancel, AxiosError } from 'axios';

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });


bot.onText(/\/start/, (msg) => {

    bot.sendMessage(msg.chat.id, "Welcome", {
        "reply_markup": {
            "keyboard": [["Weather in Nice"]]
        }
    });

});
bot.on('message', async (msg) => {
    if (msg.text == "Weather in Faleria") {
        bot.sendMessage(msg.chat.id, "Welcome", {
            "reply_markup": {
                "keyboard": [["Every 3 hours"], ["Every 6 hours"]]
            }
        });
    }
    if (msg.text == "Every 3 hours") {
            bot.sendMessage(msg.chat.id, `So here is the weather forecast with 3 hour interval for the most beautiful town of Faleria:\n ${weatherObjToText(await getWeather(3))}`);
    }
    if (msg.text == "Every 6 hours") {
            bot.sendMessage(msg.chat.id, `So here is the weather forecast with 6 hour interval for the most beautiful town of Faleria:\n ${weatherObjToText(await getWeather(6))}`);
    }
});
async function getWeather(period) {  //period stands for hours
    let data = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=Rome,Italy&appid=${process.env.WEATHER_KEY}`);
    let result = [];
        for (let i = 0; i < 12; i+=period/3) { //it takes an arbitrary number of 12 entries, propmpting it is out of scope in this task
            let day = data.data.list[i].weather[0]; // I want to notice that it is not specified which weather data I am supposed to give to the user thus I provide only the basic data
            day.time =data.data.list[i].dt_txt;
            delete day.id; // pushing this information is basically a waste of bandwidth
            delete day.icon;
            result.push(day);
        }
        return result;
}

function weatherObjToText(weatherArr) { //proper string formatting wasn't in the deal as well
  return weatherArr.map((obj) => {
    const { main, description, time } = obj;
    return `For ${time} we have generally ${main} weather characterized by ${description}`;
  }).join('\n');
}
