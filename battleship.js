import promptSync from 'prompt-sync';
import { printBoard, 
        print,
        spotValidator,
        spotParser,
        generateBoard } from './helpers.js';

const prompt = promptSync()

var GAME_STATE = {
    stage: 0,
    gameEnded: false
}

const messages = {
    welcome: "Hello, choose a thing",
    badSpot: 'Uh oh'
}


var boards = {
    player: {
        fullBoard: '',
        viewBoard: [
            [0,0,0,0,0,0,0,0,0,0 ],
            [0,0,0,0,0,0,0,0,0,0 ],
            [0,0,0,0,0,0,0,0,0,0 ],
            [0,0,0,0,0,0,0,0,0,0 ],
            [0,0,0,0,0,0,0,0,0,0 ],
            [0,0,0,0,0,0,0,0,0,0 ],
            [0,0,0,0,0,0,0,0,0,0 ],
            [0,0,0,0,0,0,0,0,0,0 ],
            [0,0,0,0,0,0,0,0,0,0 ],
            [0,0,0,0,0,0,0,0,0,0 ],
        ],
        moves: []
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
        moves: []
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

    while (isNaN(boardNum) || boardNum < 0 || boardNum > 3) {
        boardNum = prompt('Sorry, not valid. Try again:  ');
        boardNum = parseInt(boardNum)
    }

    boards.player.fullBoard = potentialBoards[parseInt(boardNum) - 1][0]
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
        if (boards.computer.fullBoard[spot[0]][spot[1]] == 1) {
            boards.computer.viewBoard[spot[0]][spot[1]] = "X"
            print("Nice! You got a hit")
            printBoard(boards.computer.viewBoard)
        } else {
            boards.computer.viewBoard[spot[0]][spot[1]] = "-"
            print("Boo! You missed")
            printBoard(boards.computer.viewBoard)
        }
        GAME_STATE.stage += 1;
    } else {
        //computer move
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
                playerTurn()
                break;
            case 2: // Computer Turn
                print('Now its the computers turn')
                GAME_STATE.gameEnded = true
                break;

            
            default:
            // code block
        }
    }
}

play()
