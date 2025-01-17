const { Bot, InlineKeyboard } = require('grammy');

const bot = new Bot('7508169922:AAGm6Yyph7eAy2e0vwNRoq7Jo-dWV8tiMtE');

bot.command('start', (ctx) => {
    const keyboard = new InlineKeyboard()
        .text('Начать игру', 'play')
        .row()
        .text('Помощь', 'help');

    ctx.reply('Привет! Добро пожаловать в игровой бот! Здесь вы можете сделать ставку на "Орел" или "Решка" и проверить свою удачу.\n\n',
        'Вот краткое объяснение правил игры:\n\n1. Вы можете начать новую игру, используя команду /play или нажав на кнопку ниже.\n2. После начала игры выберите кнопку "Орел" или "Решка" для своей ставки.\n3. Бот случайным образом определит, выпал ли "Орел" или "Решка".\n4. После определения результата я сообщу вам, выиграли ли вы.\n5. Используйте команду /help для получения информации о правилах игры и доступных командах.',
        'Удачи! 🍀', { reply_markup: keyboard });
});

bot.command('help', (ctx) => {
    ctx.reply('Правила игры и команды\n\nКоманды, доступные в игре:\n\n',
    '/start: Приветствие пользователя и объяснение правил игры.\n/play: Начало новой игры. Сделайте свою ставку: "Орел" или "Решка".\n/help: Получите информацию о правилах игры и командах.\n\n',
    'Правила игры:\n\n1. Сделайте свою ставку: Выберите между "Орел" и "Решка".\n2. Бот случайным образом выберет один из двух вариантов.\n3. Получив результат, вы можете выбрать, хотите ли сыграть еще раз.\n\n',
    'Надеюсь, это поможет вам насладиться игрой. Удачи! 🎲');
});

bot.command('play', (ctx) => {
    const keyboard = new InlineKeyboard()
        .text('Орел', 'heads')
        .row()
        .text('Решка', 'tails');

    ctx.reply('Сделайте ставку: ', { reply_markup: keyboard });
});

bot.callbackQuery('heads', (ctx) => {
    const keyboard = new InlineKeyboard()
    .text('Да', 'play')
    .row()
    .text('Нет', 'no');

    const result = Math.random() < 0.5 ? 'heads' : 'tails';
    const resultText = result === 'heads' ? 'Орел! Вы победили!' : 'Решка... Вы проиграли.';

    ctx.reply('Хотите сыграть еще раз?', { reply_markup: keyboard });
});

bot.callbackQuery('tails', (ctx) => {
    const keyboard = new InlineKeyboard()
    .text('Да', 'play')
    .row()
    .text('Нет', 'no');

    const result = Math.random() < 0.5 ? 'heads' : 'tails';
    const resultText = result === 'tails' ? 'Решка! Вы победили!' : 'Орел... Вы проиграли.';

    ctx.reply('Хотите сыграть еще раз?', { reply_markup: keyboard });
});

bot.start();
console.log('Бот запущен.');