const { covidWorld } = require('./api_covid');
const { quran } = require('./api_quran');

const Telegraf = require('telegraf'); // import telegram lib

// token dari @BotFather
const token = process.env.TELEGRAM_TOKEN;

const bot = new Telegraf(token); // get the token from envirenment variable

bot.catch((err, ctx) => {
  console.log(`Ooops, encountered an error for ${ctx.updateType}`, err);
});

bot.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log('Response time: %sms', ms);
});

bot.start((ctx) => ctx.reply('Welcome, kindly text me /help to see all commands')); // display Welcome text when we start bot

bot.command('help', (ctx) => {
  ctx.replyWithMarkdown(
    `
List of bot commands\n
*covid19 [country or country code (ISO)]*
_Get a global or country summary of covid-19 cases.
Example: covid19 indonesia_

*quran [chapter]:[verse]*
_Get spesific verse with requested chapter (Arab & Indonesia translation).
Example: quran 18:60_
`
  );
});

bot.command('quit', (ctx) => {
  // // Explicit usage
  // ctx.telegram.leaveChat(ctx.message.chat.id);

  // Using context shortcut
  ctx.leaveChat();
});

bot.on('text', async (ctx) => {
  let { message } = ctx;
  let { text } = message;
  text = text.toLowerCase();

  if (text.startsWith('covid19')) {
    let code = text.split(' ');
    const result = await covidWorld(code[1]);
    // console.log(result);
    ctx.replyWithMarkdown(result);
  }

  if (text.startsWith('quran')) {
    let splitText = text.split(' ');

    if (splitText.length > 2) {
      let quranSearch = splitText[2].split(':');

      const result = await quran(quranSearch[0], quranSearch[1], true);
      // console.log(result);
      ctx.replyWithMarkdown(result);
    } else {
      let quranSearch = splitText[1].split(':');

      const result = await quran(quranSearch[0], quranSearch[1]);
      // console.log(result);
      ctx.replyWithMarkdown(result);
    }
  }

  if (text === 'hi') ctx.replyWithMarkdown(`Hello, ${ctx.message.from.first_name} 😄`);

  // Using context shortcut
});

bot.on('callback_query', (ctx) => {
  // Explicit usage
  ctx.telegram.answerCbQuery(ctx.callbackQuery.id);

  // Using context shortcut
  ctx.answerCbQuery();
});

bot.on('inline_query', (ctx) => {
  const result = [];
  // Explicit usage
  ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result);

  // Using context shortcut
  ctx.answerInlineQuery(result);
});

bot.launch(); // start

module.exports = bot;
