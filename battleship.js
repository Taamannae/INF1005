import promptSync from 'prompt-sync';
import { printBoard, 
        getRandomInt,
        print,
        spotValidator,
        spotParser,
        generateBoard,
        printStatus,} from './helpers.js';

const prompt = promptSync()

var GAME_STATE = {
    stage: 0,
    gameEnded: false
}

const messages = {
    welcome: "Hello, choose a thing",
    badSpot: 'Uh oh'
}
const SHIPS = {
    player: [
        { name: "Carrier", shipSize: 5, hitTotal:0, shipSunk: false, coords:[]},
        { name: "Battleship", shipSize: 4, hitTotal:0, shipSunk: false, coords:[]},
        { name: "Cruiser", shipSize: 3, hitTotal:0, shipSunk: false, coords:[]},
        { name: "Submarine", shipSize: 3, hitTotal:0, shipSunk: false, coords:[]},
        { name: "Destroyer", shipSize: 2, hitTotal:0, shipSunk: false, coords:[]},],
    computer: [
        { name: "Carrier", shipSize: 5, hitTotal:0, shipSunk: false, coords:[] },
        { name: "Battleship", shipSize: 4, hitTotal:0, shipSunk: false, coords:[]},
        { name: "Cruiser", shipSize: 3, hitTotal:0, shipSunk: false, coords:[]},
        { name: "Submarine", shipSize: 3, hitTotal:0, shipSunk: false, coords:[]},
        { name: "Destroyer", shipSize: 2, hitTotal:0, shipSunk: false, coords:[]},]
    }

var boards = {
    player: {
        fullBoard: '',
        viewBoard: '',
    },
    computer: {
        fullBoard: '',
        viewBoard: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ],
        computerQueue: []
    },
    empty: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
}

function winCondition() {
    return false
}

function computerSetup() {
    let computerBoard = generateBoard()
    boards.computer.fullBoard = computerBoard[0];
    boards.computer.shipLocation = computerBoard[1];
    return ''
}

function chooseBoard() {
    let potentialBoards = [generateBoard(), generateBoard(), generateBoard()]

    print('1) Option 1')
    printBoard(potentialBoards[0][0])
    print('2) Option 2')
    printBoard(potentialBoards[1][0])
    print('3) Option 3')
    printBoard(potentialBoards[2][0])


    var boardNum = prompt('Select one of the above boards to play on:');

    while (boardNum.length == 0 || isNaN(boardNum) || boardNum < 0 || boardNum > 3) {
        boardNum = prompt('Sorry, not valid. Try again:  ');
        boardNum = parseInt(boardNum)
    }

    boards.player.fullBoard = potentialBoards[parseInt(boardNum) - 1][0]
    boards.player.viewBoard = potentialBoards[parseInt(boardNum) - 1][0]
    boards.player.shipLocation = potentialBoards[parseInt(boardNum) - 1][1]
}

function playerTurn() {
    printBoard(boards.computer.viewBoard)
    var spot = prompt('Where do you want to place the hit?');
    let valid = spotValidator(spot)

    while (!valid) {
        spot = prompt('Sorry, it must be alpha-numeric like "B9". Please try again: ');
        valid = spotValidator(spot)

    }
    spot = spotParser(spot)
    checkHit(spot, 'PLAYER')
}

function checkHit(spot, type) {
    if (type == 'PLAYER') {
        GAME_STATE.stage += 1;
        if (boards.computer.fullBoard[spot[0]][spot[1]] == 1) {
            boards.computer.viewBoard[spot[0]][spot[1]] = "X" 
            print("Nice! You got a hit")
            printBoard(boards.computer.viewBoard)
            return true
        } else {
            boards.computer.viewBoard[spot[0]][spot[1]] = "-"
            print("Boo! You missed")
            printBoard(boards.computer.viewBoard)
        }
    } else {
        GAME_STATE.stage -= 1;
        if (boards.player.fullBoard[spot[0]][spot[1]] == 1) {
            boards.player.viewBoard[spot[0]][spot[1]] = "✓"
            console.log("Aww! Your ship got a hit") 
            printBoard(boards.player.viewBoard) 
            return true
        } else {
            boards.player.viewBoard[spot[0]][spot[1]] = "X"
            console.log("Nice! They missed")
            printBoard(boards.player.viewBoard) 
        }
    }
    return false
}

function computerTurn() {
    var successfulSpot = false;
    while (!successfulSpot) {
        var wasQueue = false
        var spot = [getRandomInt(9), getRandomInt(9)];
        if (boards.computer.computerQueue.length > 0) {
            spot = boards.computer.computerQueue[0];
            var previous = boards.computer.computerQueue[1];
            boards.computer.computerQueue.shift();
            boards.computer.computerQueue.shift();

            if (boards.player.viewBoard[previous[0]][previous[1]] !== '✓') {
                continue;
            }
            wasQueue = true;
        }
        if (boards.player.viewBoard[spot[0]][spot[1]] == '-' || boards.player.viewBoard[spot[0]][spot[1]] == '✓') {
            continue
        }

        if (checkHit(spot, 'COMPUTER') && !wasQueue) {
            // If we hit a new ship, add the horizontal and vertical squares nearby to try and sink it before trying
            // any more random guesses.
            for (let i = 1; i <= 4; ++i) {
                if (spot[0] - i >= 0) {
                    boards.computer.computerQueue.push([spot[0] - i, spot[1]]);
                    boards.computer.computerQueue.push([spot[0] - i + 1, spot[1]]);
                }
                if (spot[0] + i < 9) {
                    boards.computer.computerQueue.push([spot[0] + i, spot[1]]);
                    boards.computer.computerQueue.push([spot[0] + i - 1, spot[1]]);
                }
                if (spot[1] - i >= 0) {
                    boards.computer.computerQueue.push([spot[0], spot[1] - i]);
                    boards.computer.computerQueue.push([spot[0], spot[1] - i + 1]);
                }
                if (spot[1] + i < 9) {
                    boards.computer.computerQueue.push([spot[0], spot[1] + i]);
                    boards.computer.computerQueue.push([spot[0], spot[1] + i - 1]);
                }
            }
        successfulSpot = true;
    }
}
} // jd - added missing bracket  here but causes problems

function play() {
    while (!GAME_STATE.gameEnded) {
        switch (GAME_STATE.stage) {
            case 0: //Welcome State
                print(messages.welcome)
                computerSetup()
                chooseBoard()
                print("Let's start the game")
                GAME_STATE.stage += 1;
                break;
            case 1: // Player Turn
                print("Here is your game view \n")
                playerTurn()
                printStatus(SHIPS.computer);
                console.log("")
                break;
            case 2: // Computer Turn
                computerTurn()
                break;

            
            default:
            // code block
        }
    }
} // wouldnt run when I added another } here
play()
