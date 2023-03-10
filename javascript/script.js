
const X_class = 'x';
const circle_class = 'circle'
const winningCombinataion = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElement = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMeassage');
const restartBtn = document.getElementById('restart-btn');
const winningMessTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn;

startGame();

restartBtn.addEventListener('click',startGame);
function startGame() {
    circleTurn = false;
    cellElement.forEach(cell => {
        cell.classList.remove(X_class);
        cell.classList.remove(circle_class);
        cell.removeEventListener('click',handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? circle_class : X_class;
    placeMark(cell, currentClass);

    if (checkWin(currentClass)) {
        // console.log('Winner')
        endGame(false)
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurn();
        setBoardHoverClass();
    }
}

function endGame(draw) {
    if (draw) {
        winningMessTextElement.innerText = 'Draw!'
    } else {
        winningMessTextElement.innerText = `${circleTurn ? "O' s" : "X' s"} Wins!`
    }
    winningMessageElement.classList.add('show')
}
function isDraw(){
    return [...cellElement].every(cell =>{
        return cell.classList.contains(X_class) ||
        cell.classList.contains(circle_class)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurn() {
    circleTurn = !circleTurn;
}

function setBoardHoverClass() {
    board.classList.remove(X_class);
    board.classList.remove(circle_class)

    if (circleTurn) {
        board.classList.add(circle_class)
    } else {
        board.classList.add(X_class);
    }
}

function checkWin(currentClass) {
    return winningCombinataion.some(combination => {
        return combination.every(index => {
            return cellElement[index].classList.contains(currentClass)
        })
    })
}