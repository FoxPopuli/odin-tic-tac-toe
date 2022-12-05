const PlayerFactory = (name, mark) => {
    let gamesWon = 0;
    let gamesLost = 0

    const win = function () {gamesWon += 1}
    const lose = () => {gamesLost += 1}

    const introduceSelf = () => {
        console.log(`Hi! My name is ${name}. I've won ${gamesWon} games and lost ${gamesLost} games`);
    }

    return {
        name,
        introduceSelf
    }
}

const Board = (function(){

    const element = document.createElement('div');
    element.classList.add('board');

    const SquareFactory = () => {
        const element = document.createElement('div');
        element.classList.add('square');

        let currentMark = null;

        const populate = (mark) => {
            if (!currentMark) {
                currentMark = mark;
                element.textContent = mark;
            }

            
        }

        return {element}

    }

}())

const p1 = PlayerFactory("James", 'X');
p1.introduceSelf();

// const GameModule = (function(){

// }())