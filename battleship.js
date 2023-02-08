import promptSync from 'prompt-sync';
import { printBoard, 
        getRandomInt,
        print,
        pause,
        spotValidator,
        spotParser,
        generateBoard,
        printStatus,} from './helpers.js';
import Chalk from 'chalk';

const prompt = promptSync()
var GAME_STATE = {
    stage: 0,
    gameEnded: false,
    gameWinnerPlayer: false,
}

const messages = {
    welcome: `
######################################################################
#        ______       _   _   _        _____ _     _                 #
#        | ___ \\     | | | | | |      /  ___| |   (_)                #
#        | |_/ / __ _| |_| |_| | ___  \\ \`--.| | __ _ _ __            #
#        | ___ \\/ _\` | __| __| |/ _ \\  \`--. \\ '_ \\| | '_ \\           #
#        | |_/ / (_| | |_| |_| |  __/ /\\__/ / | | | | |_) |          #
#        \\____/ \\__,_|\\__|\\__|_|\\___| \\____/|_| |_|_| .__/           #
#                                                | |                 #
#                                                |_|                 #
#                                       )___(                        #
#                                _______/__/_                        #
#                        ___     /===========|   ___                 #
#        ____       __   [\\\\\\]___/____________|__[///]   __          #
#        \\   \_____[\\]__/___________________________\\__[//]___        #
#         \\ INF1005                                            /     #
#          \\                                                  /      #
#    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  #
#                                                                    #
#  Game Description:                                                 #
#  Battleship is a two-player guessing game where players            #
#  try to sink each other's hidden ships by calling out              #
#  coordinates on a grid. The first player to sink all of the        #
#  opponent's ships wins the game.                                   #
#                                                                    #
#  Player vs computer                                                #
#                                                                    #
#  How to Play:                                                      #
#  1. You will be given 3 boards to choose from that will            #
#     represent your ships.                                          #
#  2. You will call out board coordinates from A1 to J10             #
#     to try and hit ships.                                          #
#  3. The computer will also call out coordinates to try             #
#     and sink your hip.                                             #
#  4. The first player to sink all 5 of their opponent's             #
#     ships will win the game                                        #
#                                                                    #
#  Ships in Play and their lengths:                                  #
#  1. Carrier - 5 units                                              #
#  2. Battleship - 4 units                                           #
#  3. Cruiser - 3 units                                              #
#  4. Submarine - 3 units                                            #
#  5. Destroyer - 2 units                                            #
#                                                                    #
######################################################################

`,
    optionText: "First, you must select a game board. Enter '1', '2', or '3'. \nThis will represent the placement of your ships that the computer will try to hit \n",
    boardNum:'Select one of the above boards (1,2,3) to play on:  ',
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

function printBoardHorizontal(board1, board2, board3) {
    console.log(Chalk.bgMagenta.black(`

   ###################       ###################       ###################
   #     Option 1    #       #     Option 2    #       #     Option 3    #
   ###################       ###################       ###################
`))

    console.log('   A B C D E F G H I J       A B C D E F G H I J       A B C D E F G H I J')

    //loop through the board
    for (let i = 0; i < board1.length; i++) {
        //If we're not on row 10, add a space because it's 2 digits 
        if (i != 9) {
            //print the row but replace the 0s (empty) with '_' and 1s (boat location) with 'O'
            console.log(i + 1, '', 
                board1[i].join().replaceAll("0", "_").replaceAll("1", "O"), '  ', 
                i + 1, '', 
                board2[i].join().replaceAll("0", "_").replaceAll("1", "O"), '  ', 
                i + 1, '', 
                board3[i].join().replaceAll("0", "_").replaceAll("1", "O"))
        } else {
            console.log(i + 1, board1[i].join().replaceAll("0", "_").replaceAll("1", "O"), '  ', i + 1, board2[i].join().replaceAll("0", "_").replaceAll("1", "O"), '  ', i + 1, board3[i].join().replaceAll("0", "_").replaceAll("1", "O"),)
        }
    }
    console.log('\n\n')


}

function chooseBoard() {
    let potentialBoards = [generateBoard(), generateBoard(), generateBoard()]

    printBoardHorizontal(potentialBoards[0][0], potentialBoards[1][0], potentialBoards[2][0])

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
    var spot = prompt('Where do you want to place the hit?  ');
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
} 

function play() {
    while (!GAME_STATE.gameEnded) {
        switch (GAME_STATE.stage) {
            case 0: //Welcome State
                print(Chalk.bgBlack(messages.welcome))
                print(Chalk.blue(messages.optionText))
                pause(3000)
                computerSetup()
                chooseBoard()
                pause(3000)
                print("Let's start the game")
                pause(1000)
                GAME_STATE.stage += 1;
                break;
            case 1: // Player Turn
                print("Here is your game view \n")
                pause(1000)
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
} 
play()
