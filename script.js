const squareSideLength = 50;

const PlayerFactory = (name, mark) => {
    let gamesWon = 0;
    let gamesLost = 0

    const win = function () {gamesWon += 1}
    const lose = () => {gamesLost += 1}

    const introduceSelf = () => {
        console.log(`Hi! My name is ${name}. I've won ${gamesWon} games and lost ${gamesLost} games`);
    }

    return {
        mark,
        introduceSelf
    }
}

const Board = (function(dim){

    const element = document.createElement('div');
    element.classList.add('board');

    element.style.width = dim * squareSideLength + 'px';
    element.style.height = dim * squareSideLength + 'px';

    const matrix = [];

    const reset = () => {
        const Square = (x, y) => {
            const squareDiv = document.createElement('div');
            squareDiv.classList.add('square');

            let populated = false;

            const populate = function () {
                populated = true;
            }
    
    
            squareDiv.addEventListener('click', () => {
                if (!populated) {
                    squareDiv.textContent = game.getMark()
                    game.takeTurn(x, y);

                } 
            })

            return {squareDiv, populate, populated}
        }
    
        let square;
        for (let i = 0; i < dim; i++) {
            cols = [];
            for (let j = 0; j < dim; j++) {
                square = Square(j, i);
                element.appendChild(square.squareDiv);
                cols.push(square)
            }
    
            matrix.push(cols);
        }

        document.querySelector('.main').appendChild(element);
    } 

    const getMatrix = function () {
        return matrix;
    }
    
    return {reset, getMatrix};

}(3))

const game = (function(){

    const player1 = PlayerFactory("James", 'X');
    const player2 = PlayerFactory('Chuck', 'O');

    let currentPlayer = player1;
    let numTurns = 0;
    let currentMark = currentPlayer.mark;
    Board.reset();

    function winCheck (matrix) {

    }


    function takeTurn (x, y) {
        let matrix = Board.getMatrix()
        let activeSquare = matrix[x][y];

        activeSquare.populated = true;
        activeSquare.textContent = currentMark;

        numTurns += 1;
        currentPlayer = numTurns % 2 ? player2 : player1;
        currentMark = currentPlayer.mark;
    }

    function getMark () {
        return currentMark;
    }

    return {takeTurn, getMark}

}())
