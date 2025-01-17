const { Bot, InlineKeyboard } = require('grammy'); 

const bot = new Bot('7508169922:AAGm6Yyph7eAy2e0vwNRoq7Jo-dWV8tiMtE'); 

bot.command('start', (ctx) => { 
    ctx.reply('Привет! Добро пожаловать в игровой бот! Здесь вы можете сделать ставку на "Орел" или "Решка" и проверить свою удачу.\n\n' + 
        'Вот краткое объяснение правил игры:\n\n1. Вы можете начать новую игру, используя команду /play или нажав на кнопку ниже.\n2. После начала игры выберите кнопку "Орел" или "Решка" для своей ставки.\n3. Бот случайным образом определит, выпал ли "Орел" или "Решка".\n4. После определения результата я сообщу вам, выиграли ли вы.\n5. Используйте команду /help для получения информации о правилах игры и доступных командах.' + 
        'Нашими /play, чтобы играть и /help, если заходите получить информацию о правилах игры и командах. Удачи! 🍀'); 
}); 

bot.command('help', (ctx) => { 
    ctx.reply('Правила игры и команды\n\nКоманды, доступные в игре:\n\n' + 
    '/start: Приветствие пользователя и объяснение правил игры.\n/play: Начало новой игры. Сделайте свою ставку: "Орел" или "Решка".\n/help: Получите информацию о правилах игры и командах.\n\n' + 
    'Правила игры:\n\n1. Сделайте свою ставку: Выберите между "Орел" и "Решка".\n2. Бот случайным образом выберет один из двух вариантов.\n3. Получив результат, вы можете выбрать, хотите ли сыграть еще раз.\n\n' + 
    'Надеюсь, это поможет вам насладиться игрой. Удачи! 🎲'); 
}); 

bot.command('play', (ctx) => { 
    const keyboard = new InlineKeyboard() 
        .text('Орел', 'head') 
        .row() 
        .text('Решка', 'tail'); 

    ctx.reply('Сделайте ставку: ', { reply_markup: keyboard }); 
}); 

bot.callbackQuery('head', async (ctx) => {  
    const result = Math.random() < 0.5 ? 'heads' : 'tails';  
    const resultText = result === 'heads' ? 'Орел! Вы победили!' : 'Решка... Вы проиграли.';  

    await ctx.reply(resultText);
    
    const keyboard = new InlineKeyboard()  
        .text('Да', 'yes')  
        .row()  
        .text('Нет', 'no');  

    await ctx.reply('Хотите сыграть еще раз?', { reply_markup: keyboard });  
});  

bot.callbackQuery('tail', async (ctx) => {  
    const result = Math.random() < 0.5 ? 'heads' : 'tails';  
    const resultText = result === 'tails' ? 'Решка! Вы победили!' : 'Орел... Вы проиграли.';  

    await ctx.reply(resultText);
    
    const keyboard = new InlineKeyboard()  
        .text('Да', 'yes')  
        .row()  
        .text('Нет', 'no');  

    await ctx.reply('Хотите сыграть еще раз?', { reply_markup: keyboard });  
}); 

bot.on('callback_query:data', (ctx => {
    const data = ctx.callbackQuery.data;

    if (data === 'yes') {
        ctx.reply('Чтобы начать игру напишите команду /play!'); 
    } else if (data === 'no') {
        ctx.reply('Спасибо за игру! Если захотите сыграть ещё раз, напишите команду /play.'); 
    }
})); 

bot.start(); 
console.log('Бот запущен.');