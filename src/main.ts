const storage     = localStorage;
const gameRestart = document.querySelector('.js-game-restart');
const gameCoins   = document.querySelector('.js-game-coins');
const gameWin     = document.querySelector('.js-game-win');
const gameLose    = document.querySelector('.js-game-lose');
const gameStatus  = document.querySelector('.js-game-status');

let init = () => {
    if (!storage.getItem('coins')) {
        storage.setItem('coins', '10');
        storage.setItem('roll_win', '0');
        storage.setItem('roll_lose', '0');
    }
    gameRefresh();
};

document.addEventListener('DOMContentLoaded', init);

gameRestart.addEventListener('click', () => {
    storage.setItem('coins', '10');
    storage.setItem('roll_win', '0');
    storage.setItem('roll_lose', '0');
    gameStatus.classList.remove('active');
    gameRefresh();
});

let gameRefresh = () => {
    gameCoins.textContent = String(storage.getItem('coins'));
    gameWin.textContent   = String(storage.getItem('roll_win'));
    gameLose.textContent  = String(storage.getItem('roll_lose'));
};

let dice = (option: number) => {
    gameStatus.classList.remove('active');
    let random = Math.floor((Math.random() * 100) + 1);
    let coins = Number(storage.getItem('coins'));
    let winGame = Number(storage.getItem('roll_win'));
    let loseGame = Number(storage.getItem('roll_lose'));
    let text = ``;
    if (coins !== 0) {
        if (option === 47) {
            if (random < option) {
                text = `the number ${random}\nCongratulations you won 2 coins!`;
                coins = coins + 2;
                winGame = winGame + 1;
            } else {
                text = `the number ${random}\nYou lost 1 point :C`;
                coins = coins - 1;
                loseGame = loseGame + 1;
            }
        } else {
            if (random > option) {
                text = `the number ${random}\nCongratulations you won 2 coins!`;
                coins = coins + 2;
                winGame = winGame + 1;
            } else {
                text = `the number ${random}\nYou lost 1 point :C`;
                coins = coins - 1;
                loseGame = loseGame + 1;
            }
        }
    } else {
        text = `You didn’t have coins, please restart the game`;
    }
    gameStatus.classList.add('active');
    gameStatus.textContent = text;
    storage.setItem('coins', String(coins));
    storage.setItem('roll_win', String(winGame));
    storage.setItem('roll_lose', String(loseGame));
};

let rollBtn = document.querySelectorAll('.js-roll');

for (let i = 0; i < rollBtn.length; i++) {
    rollBtn[i].addEventListener('click', () => {
        let option = Number(rollBtn[i].getAttribute('data-roll'));
        dice(option);
        gameRefresh();
    });
}