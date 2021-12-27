(() => {

    const container = document.getElementById('pairs-game');

    function createForm() {
        const form = document.createElement('form');

        const input = document.createElement('input');
        input.placeholder = 'Введите число карт';

        const button = document.createElement('button');
        button.textContent = 'Начать игру';
        button.classList.add('start-game-button');

        form.append(input);
        form.append(button);

        return {
            input,
            button,
            form,
        };
    }

    function checkInputNumber(number) {
        if (number % 2 === 0 && number > 1){
            return true;
        }
        else {
            alert('Введите четное число!');
        }
    }

    function hideForm(){
        document.querySelector('form').classList.add('hidden');
    }

    function createNumbers(number) {
        const arrayNumbers = [];
        for (let i = 0; i < (number / 2); i++) {
            arrayNumbers.push(i + 1);
            arrayNumbers.push(i + 1);
        }

        for (let i = number - 1; i > 0; i--) {
            let tmp = arrayNumbers[i];
            let rnd = Math.floor(Math.random() * (i + 1));

            arrayNumbers[i] = arrayNumbers[rnd];
            arrayNumbers[rnd] = tmp;
        }

        return arrayNumbers;
    }

    function createGameover() {
        const banner = document.createElement('div');
        banner.classList.add('banner');

        const text = document.createElement('p');
        

        const button = document.createElement('button');
        button.textContent = 'Начать новую игру';
        button.classList.add('button-new-game');
        button.addEventListener('click', function(){
            location.reload();
        })

        banner.append(text);
        banner.append(button);

        return {
            text,
            button,
            banner
        }
    }


    function createCard() {
        const card = document.createElement('div');
        card.classList.add('card');
        card.textContent = 'Открыть!';

        return {
            card
        };
    }


    function deleteCards() {
        const cardsToRemove = document.querySelectorAll('.card');
        for (let card of cardsToRemove) {
            card.remove();
        }
    }

    function turnCards() {
        let turnedPairsCount = 0;
        const cardsToTurn = document.querySelectorAll('.card-on-click');
        if (cardsToTurn[0].textContent != cardsToTurn[1].textContent){
            for (let cardToTurn of cardsToTurn) {
                cardToTurn.classList.remove('card-on-click');
                cardToTurn.textContent = 'Открыть!';
            }
        } else {
            turnedPairsCount++;
            for (let cardToTurn of cardsToTurn) {
                cardToTurn.classList.remove('card-on-click');
                cardToTurn.classList.add('opened-card');
            }
        }

        return turnedPairsCount;
    }

    function createTimer() {
        const numbers = document.createElement('div');
        numbers.classList.add('timer');
        numbers.textContent = 60;

        return numbers;
    }
    

    function createGame() {
        const cardNumberForm = createForm();
        container.append(cardNumberForm.form);

        cardNumberForm.button.addEventListener('click', function(e){
            e.preventDefault();

            const cardsValue = parseInt(cardNumberForm.input.value);
           

            if (checkInputNumber(cardsValue)){
                hideForm();


                let time = 60;
                const timer = createTimer();
                container.append(timer);
                let timerId = setInterval(function(){
                    time--;
                    timer.textContent = time;
                }, 1000);

                setTimeout(function(){
                    clearInterval(timerId);
                    deleteCards();
                    document.querySelector('.timer').remove();
                    const gameover = createGameover();
                    gameover.banner.classList.add('gameover');
                    gameover.text.textContent = 'Вы проиграли :(';
                    container.append(gameover.banner);
                }, 60000);



                let openedCardsCurrent = 0;
                let foundedPairs = 0;
                const cardNumbers = createNumbers(cardsValue);

                for (let i = 0; i < cardsValue; i++) {
                    const card = createCard();
                    container.append(card.card);
                    card.card.addEventListener('click', function(){

                        openedCardsCurrent++;
                        card.card.textContent = cardNumbers[i];
                        card.card.classList.add('card-on-click');

                        if (openedCardsCurrent === 2) {
                            setTimeout(function(){
                                foundedPairs = foundedPairs + turnCards();
                                if (foundedPairs === cardsValue / 2) {
                                    deleteCards();
                                    document.querySelector('.timer').remove();
                                    const gameover = createGameover();
                                    gameover.banner.classList.add('game-win');
                                    gameover.text.textContent = 'Вы победили!';
                                    container.append(gameover.banner);
                                }
                                openedCardsCurrent = 0;
                            }, 1000);
                        }

                    })
                }
            }


        });
    }

    createGame();



})()