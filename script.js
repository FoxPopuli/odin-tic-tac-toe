const squareSideLength = 50;
const dim = 3

const PlayerFactory = (name, mark) => {
    let gamesWon = 0;

    const win = function () {
        gamesWon += 1;
        document.querySelector('.message').textContent = `${name} has won!`;
    }

    const introduceSelf = () => {
        console.log(`Hi! My name is ${name}. I've won ${gamesWon} games.`);
    }

    return {
        mark,
        introduceSelf,
        win
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
                if (!populated && game.isActive()) {
                    squareDiv.textContent = game.getMark()
                    populated = true;
                    matrix[x][y] = game.getMark();
                    game.takeTurn(x, y);

                } 
            })

            return {squareDiv, populate, populated}
        }
    
        let square;
        let count = 1;
        for (let i = 0; i < dim; i++) {
            cols = [];
            for (let j = 0; j < dim; j++) {
                square = Square(j, i);
                element.appendChild(square.squareDiv);
                cols.push(count)
                count++;
            }
    
            matrix.push(cols);
        }

        document.querySelector('.main').appendChild(element);
    } 

    const getMatrix = function () {
        return matrix;
    }
    
    return {reset, getMatrix};

}(dim))

const game = (function(){

    const player1 = PlayerFactory("Taylor", 'X');
    const player2 = PlayerFactory('Olga', 'O');

    let currentPlayer = player1;
    let numTurns = 0;
    let currentMark = currentPlayer.mark;
    let active = true;
    Board.reset();

    function winCheck (matrix) {
        // Horizontal check

        for (let y = 0; y < dim; y++) {

            let row = matrix[y];

            if (row[0] === row[1]) {
                if (row[0] === row[2]) {
                    return true;
                }
            }

            
        }

        // Vertical check
        for (let x = 0; x < dim; x++) {
            let col = [];
            for (let y = 0; y < dim; y++) {
                row = matrix[y];
                col.push(row[x]);

            }

            if (col[0] === col[1]) {
                if (col[0] === col[2]) {
                    return true;
                }
            }
        }

        // Diagonal check
        if (matrix[0][0] === matrix[1][1]) {
            if (matrix[1][1] === matrix[2][2]) {
                return true;
            }
        }

        if (matrix[2][0] === matrix[1][1]) {
            if (matrix[2][0] === matrix[0][2]) {
                return true;
            }
        }

        return false;

    }


    function takeTurn (x, y) {
        if (active) {
            let matrix = Board.getMatrix()
            let activeSquare = matrix[x][y];
    
            activeSquare.populated = true;
            activeSquare.textContent = currentMark;
    
            console.log(winCheck(matrix));
            if (winCheck(matrix)) {
                currentPlayer.win();
                active = false;
            }
    
            numTurns += 1;
            currentPlayer = numTurns % 2 ? player2 : player1;
            currentMark = currentPlayer.mark;
        }

    }

    function getMark () {
        return currentMark;
    }

    function isActive() {
        return active;
    }

    return {takeTurn, getMark, isActive}

}())
