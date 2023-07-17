//Ініціалізуй плеєр у файлі скрипта як це описано в секції pre-existing player, але враховуй, що у тебе плеєр 
//доданий як npm пакет, а не через CDN.

import  throttle  from 'lodash.throttle';
import Player from '@vimeo/player';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

//Вивчи документацію методу on() і почни 
//відстежувати подію timeupdate - оновлення часу 
//відтворення.
const TIME_KEY = 'videoplayer-current-time';
//Зберігай час відтворення у локальне сховище. 
//Нехай ключем для сховища буде рядок 
//"videoplayer-current-time".
// player.on('timeupdate', throttle((event) => {
//   const currentSecondsTime = event.seconds;
//   localStorage.setItem(TIME_KEY, currentSecondsTime);
// }, 1000));

const onPlay = function (data) {
  const strigifyData = JSON.stringify(data.seconds);
  localStorage.setItem(TIME_KEY, strigifyData);
};
player.on('timeupdate', throttle(onPlay, 1000));

//Під час перезавантаження сторінки скористайся 
//методом setCurrentTime() з метою відновлення 
//відтворення зі збереженої позиції.
if (JSON.parse(localStorage.getItem(TIME_KEY)) === null) {
    //якщо немає в локал стореджі то виходимо
    return;
}
//шукаю місце зупинки перегляду 
const pause = JSON.parse(localStorage.getItem(TIME_KEY));
if (pause) {
    player
    .setCurrentTime(pause)
    .then(function (seconds) { })
    .catch(function (error) {
        switch (error.name) {
            case 'Error':
                 break;
            default:
                break;
        }
    });
}

