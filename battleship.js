import promptSync from 'prompt-sync';
import { printBoard, 
        getRandomInt,
        print,
        pause,
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
    welcome: `
##########################################################################
#        ______       _   _   _        _____ _     _
#        | ___ \\     | | | | | |      /  ___| |   (_)
#        | |_/ / __ _| |_| |_| | ___  \\ \`--.| | __ _ _ __  
#        | ___ \\/ _\` | __| __| |/ _ \\  \`--. \ '_ \\| | '_ \\ 
#        | |_/ / (_| | |_| |_| |  __/ /\__/ / | | | | |_) |
#        \\____/ \\__,_|\\__|\\__|_|\\___| \\____/|_| |_|_| .__/ 
#                                                | |    
#                                                |_|    
#                                        )___(
#                                _______/__/_
#                        ___     /===========|   ___
#        ____       __   [\\\\\\]___/____________|__[///]   __
#        \\   \_____[\\]__/___________________________\\__[//]___
#        \\ INF1005                                            /
#        \\                                                  /
#    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#
#  Game Description:
#  Battleship is a two-player guessing game where players 
#  try to sink each other's hidden ships by calling out
#  coordinates on a grid. The first player to sink all of the
#  opponent's ships wins the game.
#
#  Plyer vs computer
#
#  How to Play:
#  1. You will be given 3 boards to choose from that will represent your ships.
#  2. You will call out board coordinates from A1 to J10 to try and hit ships.
#  3. The computer will also call out coordinates to try and sink your hip.
#  4. The first player to sink all 5 of their opponent's ships will win the game
#
#  Ships in Play and their lengths:
#  1. Carrier - 5 units
#  2. Battleship - 4 units
#  3. Cruiser - 3 units
#  4. Submarine - 3 units
#  5. Destroyer - 2 units
#
##########################################################################


    `,
    optionText: "First, you must select a game board.\nThis will represent the placement of your ships that the computer will try to hit \n",
    optionNumber: function(num) {
        return `
###################
#                 #
#     Option ${num}    #
#                 #
###################
        `

    },
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

    print(messages.optionNumber(1))
    printBoard(potentialBoards[0][0])
    print(messages.optionNumber(2))
    printBoard(potentialBoards[1][0])
    print(messages.optionNumber(3))
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
    }
        successfulSpot = true;
    }
} // jd - added missing bracket  here but causes problems

function play() {
    while (!GAME_STATE.gameEnded) {
        switch (GAME_STATE.stage) {
            case 0: //Welcome State
                print(messages.welcome)
                print(messages.optionText)
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
                GAME_STATE.stage += 1;
                break;
            case 2: // Computer Turn
                pause(3000)
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
