import promptSync from 'prompt-sync';
import { printBoard, 
        getRandomInt,
        print,
        pause,
        spotValidator,
        spotParser,
        generateBoard,
        spotPrettify,
        printStatus,} from './helpers.js';
import { printPlayerViewBoardsHorizontal,
         printBoardChoiceHorizontal,
         printTurnStartMessage } from './printers.js'
import { messages } from './messages.js';
import Chalk from 'chalk';

const prompt = promptSync()
var GAME_STATE = {
    stage: 0,
    gameEnded: false,
    gameWinnerPlayer: false,
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

function winCondition(player) {
    for (let i = 0; i < boards[player].shipLocation.length; i++) {
        if (boards[player].shipLocation[i].shipSunk) {
            continue
        }
        return false
    }
    return true
}

function computerSetup() {
    let computerBoard = generateBoard()
    boards.computer.fullBoard = computerBoard[0];
    boards.computer.shipLocation = computerBoard[1];
    return ''
}


function chooseBoard() {
    let potentialBoards = [generateBoard(), generateBoard(), generateBoard()]
    printBoardChoiceHorizontal(potentialBoards[0][0], potentialBoards[1][0], potentialBoards[2][0])

    var boardNum = prompt(messages.boardNum);

    while (boardNum.length == 0 || isNaN(boardNum) || boardNum < 0 || boardNum > 3) {
        boardNum = prompt('Sorry, not valid. Try again:  ');
        boardNum = parseInt(boardNum)
    }

    boards.player.fullBoard = potentialBoards[parseInt(boardNum) - 1][0]
    boards.player.viewBoard = potentialBoards[parseInt(boardNum) - 1][0]
    boards.player.shipLocation = potentialBoards[parseInt(boardNum) - 1][1]
}

function playerTurn() {
    var spot = prompt(messages.playerTurnPrompt);
    let valid = spotValidator(spot, boards.computer.viewBoard)
    while (!valid) {
        spot = prompt('Sorry, it must be alpha-numeric like "B9". Please try again: ');
        valid = spotValidator(spot, boards.computer.viewBoard)
    }
    spot = spotParser(spot)
    checkHit('computer', spot)
}

function findShip(player, spot) {
    //loop through the ships
    for (let i = 0; i < boards[player].shipLocation.length; i++) {
        //loop through the coords
        for (let j = 0; j < boards[player].shipLocation[i].coords.length; j++) {
            //Check if coord X matches the hit spot
            if (boards[player].shipLocation[i].coords[j][0] === spot[0]){
                //Check if coord Y matches the hit spot
                if (boards[player].shipLocation[i].coords[j][1] === spot[1]) {

                    // Increase hit total of the ship
                    boards[player].shipLocation[i].hitTotal += 1;

                    // Check if the hit results in a sink by comparing hit total to shipsize
                    if (boards[player].shipLocation[i].hitTotal >= boards[player].shipLocation[i].shipSize) {
                        boards[player].shipLocation[i].shipSunk = true
                        return messages.spotHitMessage(player, 'SUNK', boards[player].shipLocation[i].name, spotPrettify(spot))
                    }
                    return messages.spotHitMessage(player, 'HIT', boards[player].shipLocation[i].name, spotPrettify(spot))
                }
                continue
            } else {
                continue
            }
        }
    }
}
function checkHit(player, spot) {
    if (boards[player].fullBoard[spot[0]][spot[1]] == 1) {
        boards[player].viewBoard[spot[0]][spot[1]] = "✓" 
        let hitShip = findShip(player, spot)
        console.log(hitShip)
        return true
    } else {
        boards[player].viewBoard[spot[0]][spot[1]] = "X"
        console.log(messages.missedMessage(player, spotPrettify(spot)))
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

        if (checkHit('player', spot) && !wasQueue) {
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
    }
        successfulSpot = true;
    }
} 

function play() {
    while (!GAME_STATE.gameEnded) {
        switch (GAME_STATE.stage) {
            case 0: //Welcome State
                print(Chalk.bgBlack(messages.welcome))
                pause(1000)
                computerSetup()
                chooseBoard()
                pause(1000)
                print(Chalk.bgBlue.black(messages.startGame))
                pause(1000)
                GAME_STATE.stage += 1;
                break;
            case 1: // Player Turn
                printTurnStartMessage()
                printPlayerViewBoardsHorizontal(boards.player.fullBoard, boards.computer.viewBoard)
                pause(1000)
                playerTurn()
                var checkWin = winCondition('computer')
                if (checkWin) {
                    GAME_STATE.gameWinnerPlayer = true
                    GAME_STATE.stage = 3
                    break
                }
                GAME_STATE.stage += 1;
                break;
            case 2: // Computer Turn
                pause(1000)
                console.log(Chalk.bgMagenta.black.bold(messages.computerTurnMessage))
                pause(2000)
                computerTurn()
                var checkWin = winCondition('player')

                if (checkWin) {
                    GAME_STATE.gameWinnerPlayer = false
                    GAME_STATE.stage = 4
                    break
                }
                pause(3000)

                GAME_STATE.stage -= 1;
                break;
            case 3: // Game END Player won
                console.log('YOU WON WOHOOO')
                GAME_STATE.gameEnded = true

                break;
            case 4: // Game END computer won
                console.log('Computer won, booo')
                GAME_STATE.gameEnded = true
                break;
            default:
            // code block
        }
    }
} 
play()
