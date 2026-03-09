const TelegramBot = require("node-telegram-bot-api");
const createWallet = require("./wallet");

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {

  const wallet = createWallet();

  bot.sendMessage(
    msg.chat.id,
    `Welcome to Ping2Pay!\nYour wallet:\n${wallet.address}`
  );
});

module.exports = bot;
