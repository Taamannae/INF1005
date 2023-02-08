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
    gameEnded: false,
    gameWinnerPlayer: false,
}

const messages = {
    welcome: "Please choose your board to start. Enter '1', '2', or '3'.",
    badSpot: 'Uh oh'
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
    var spot = prompt('Where do you want to place the hit?');
    let valid = spotValidator(spot, boards.computer.viewBoard)

    while (!valid) {
        spot = prompt('Sorry, it must be alpha-numeric like "B9". Please try again: ');
        valid = spotValidator(spot, boards.computer.viewBoard)

    }
    spot = spotParser(spot)
    checkHit(spot, 'PLAYER')
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
                        let message = `Nice job! You have SUNK their ${boards[player].shipLocation[i].name}`
                        if (player === 'player') {
                            message = `Oh no! They have SUNK your ${boards[player].shipLocation[i].name}`
                        }
                        return message
                    }

                    let message = `Nice job! You have HIT their ${boards[player].shipLocation[i].name}`
                    if (player === 'player') {
                        message = `Oh no! They have hit your ${boards[player].shipLocation[i].name}`
                    }
                    return message
                }
                continue
            } else {
                continue
            }
        }
    
        }
}
function checkHit(spot, type) {
    if (type == 'PLAYER') {
        if (boards.computer.fullBoard[spot[0]][spot[1]] == 1) {
            boards.computer.viewBoard[spot[0]][spot[1]] = "X" 
            let hitShip = findShip("computer", spot)
            console.log(hitShip)
            printBoard(boards.computer.viewBoard)
            return true
        } else {
            boards.computer.viewBoard[spot[0]][spot[1]] = "-"
            print("Boo! You missed")
            printBoard(boards.computer.viewBoard)
        }
    } else {
        if (boards.player.fullBoard[spot[0]][spot[1]] == 1) {
            boards.player.viewBoard[spot[0]][spot[1]] = "✓"
            let hitShip = findShip("player", spot)
            console.log(hitShip)
            printBoard(boards.player.viewBoard) 
            return true
        } else {
            boards.player.viewBoard[spot[0]][spot[1]] = "X"
            console.log("Nice! The computer missed your ships")
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
    }
        successfulSpot = true;
    }
}

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
                printBoard(boards.computer.viewBoard)
                playerTurn()
                var checkWin = winCondition('computer')
                if (checkWin) {
                    GAME_STATE.gameWinnerPlayer = true
                    GAME_STATE.stage = 3
                    break
                }
                var chooseNext = prompt("To view the status of the hits you made on Computer, type 'Status'. If you want to continue, type 'Continue' "); // new prompt to slow the game? 
                while (chooseNext !== 'null') {
                    if (chooseNext === "Status") {
                      printStatus(boards.computer.shipLocation);
                      break;
                    } else if (chooseNext === "Continue") {
                      break;
                    } else {
                      chooseNext = prompt('Sorry, not valid. Try again:  ');
                    }
                  }
                GAME_STATE.stage += 1;
                break;
            case 2: // Computer Turn
                computerTurn()
                var checkWin = winCondition('player')

                if (checkWin) {
                    GAME_STATE.gameWinnerPlayer = false
                    GAME_STATE.stage = 4
                    break
                }
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
} // wouldnt run when I added another } here
play()
