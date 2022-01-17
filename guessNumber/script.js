'use strict';

const getRandomNumber = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
};

const isNum = n => {
    return !isNaN(parseFloat(n)) && isFinite(n);
};



const start = () => {
    let randomNumber = getRandomNumber(100);

    const game = () => {
        const num = prompt('"Угадай число от 1 до 100"');
        if (num === null) {
            alert('До свидания');
            return;
        }
        if (isNum(num)) {
            const realNum = +num;
            console.log(realNum);
            console.log(randomNumber);
            if (realNum > randomNumber) {
                alert('Загаданное число меньше');
                game();
            } else if (realNum < randomNumber) {
                alert('Загаданное число больше');
                game();
            } else {
                if (confirm('Вы угадали! Сыграем ещё?')) {
                    start();
                } else {
                    alert('До свидания');
                    return;
                }
            }
        } else {
            alert('Введите число');
            game();
        }
    };
    game();
    
};

start();

