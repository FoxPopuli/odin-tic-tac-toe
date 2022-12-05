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

const Board = (function(dim){

    const element = document.createElement('div');
    element.classList.add('board');

    const reset = () => {

    } 
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

        return {element, populate}

    }

    const array = [];
    for (let i = 0; i < dim; i++) {
        cols = [];
        for (let j = 0; j < dim; j++) {
            cols.push(SquareFactory());
        }

        array.push(cols);

    }

    console.log(array)

}(3))

const p1 = PlayerFactory("James", 'X');
p1.introduceSelf();

// const GameModule = (function(){

// }())