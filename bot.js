
const telegramApi = require('node-telegram-bot-api')

const bot = new telegramApi('1873588278:AAHt-5C8A1EZ_xuDHH47KsLZXcVrfCiZMng', {polling: true})

const options = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{text: 'Частозадаваемые вопросы', callback_data: 'Вопросы'}],
      [{text: 'Связь с Администратором', callback_data: `Администратор - @kstnkan`}],
      [{text: 'Связь с ветеринаром', callback_data: 'Ветеринар - @kstnkan'}]
    ]
  })
}
const back = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{text: 'Назад', callback_data: 'Назад'}],
    ]
  })
}

const questions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{text: 'Кот ведет себя как собака', callback_data: '1'}],
      [{text: 'Как записаться на прием?', callback_data: '2'}],
      [{text: 'Когда можно прививать котенка/щенка?', callback_data: '3'}],
      [{text: 'Зачем нужен Pet Sync?', callback_data: '4'}],
      [{text: 'Анализы питомца плохие, что делать?', callback_data: '5'}],
      [{text: 'Пес сильно линяет', callback_data: '6'}],
      [{text: 'Как спасти питомца от жары?', callback_data: '7'}],
      [{text: 'Другой вопрос', callback_data: '8'}],
    ]
  })
}

bot.setMyCommands([
  {command: '/start', description: 'Начало работы'},
  {command: '/info', description: 'Информация о боте'},

])

bot.on('message', async (msg) => {

  const text = msg.text
  const chatId = msg.chat.id

  if(text === '/start'){
    await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/b48/7e2/b487e222-21cd-4741-b567-74b25f44b21a/4.webp')
    await bot.sendMessage(chatId, `Привет, ${msg.from.first_name}!`);
    return bot.sendMessage(chatId, `Что ты хочешь сделать?`, options);

  }

  if(text === '/info'){
    return bot.sendMessage(chatId, `Привет, ${msg.from.first_name}! Я бот Pet Sync и я могу ответить на частозадаваемы вопросы и связать тебя с ветеринаром или администратором!`);
  }

  return bot.sendMessage(chatId, `Я тебя не понимаю, попробуй еще раз!)`);
  
});

bot.on('callback_query', async (msg) => {
  console.log(msg)
  const data = msg.data
  const chatId = msg.message.chat.id
  if(data === 'Администратор - @kstnkan'){
   return bot.sendMessage(chatId, `Напиши нашему Администратору, он ответит в течение пары минут! ${data}`)
  }
  if(data === 'Ветеринар - @kstnkan'){
    return bot.sendMessage(chatId, `Напиши нашему Ветеринару, он ответит в течение пары минут! ${data}`)
  }
  if(data === 'Вопросы'){
    return bot.sendMessage(chatId, `${data}:`, questions)
  }
  if(data === '1'){
   return bot.sendMessage(chatId, `Ответ: Возможно у вас не кот а пес!`, back)
  }
  if(data === '2'){
    return bot.sendMessage(chatId, `Ответ: Войдите или зарегистрируйтесь в приложении Pet Sync перейдите в профиль и откройте мои записи!`, back)
   }
  if(data === '3'){
   return bot.sendMessage(chatId, `Ответ: Прививать животное можно в возрасте 2-х мксяцев`, back)
  }
  if(data === '4'){
    return bot.sendMessage(chatId, `Ответ: С нашим приложением вы сможете сделать своего питомца счастливым`, back)
   }
  if(data === '5'){
    return bot.sendMessage(chatId, `Ответ: зайдите в свой профиль Pet Sync и запишитесь к ветеринару`, back)
  }
  if(data === '6'){
    return bot.sendMessage(chatId, `Ответ: Сводите его на груминг`, back)
  }
  if(data === '7'){
   return bot.sendMessage(chatId, `Ответ: Включите кондиционер`, back)
  }
  if(data === '8'){
   return bot.sendMessage(chatId, `Ответ: Свяжитесь с ветеринаром или оператором`, back)
  }
  if(data === 'Назад'){
    await bot.sendMessage(chatId, `Привет, ${msg.from.first_name}!`);
    return bot.sendMessage(chatId, `Что ты хочешь сделать?`, options);
  }
  return bot.sendMessage(chatId, `Я тебя не понимаю, попробуй еще раз!)`);
  
})
