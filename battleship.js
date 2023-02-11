import Chalk from 'chalk';

import {chooseBoard, computerTurn, winCondition, computerSetup, pause,playerTurn, anyKeyToContinue,} from './helpers.js';
import {printBoardTitle, printStatus, printBoard, printPlayerMessage, printTurnStartMessage } from './printers.js';
import { messages } from './messages.js';

var GAME_STATE = {
    stage: 0,
    gameEnded: false,
    gameWinnerPlayer: false,
}

// The main data storage for the player & computer
var BOARDS = {
    player: {
        fullBoard: '',
        shipLocation: '',
        lastMove: ''
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
        computerQueue: [],
        shipLocation: '',
        lastMove: ''
    }
}

// The main game
function playBattleShip() {
    while (!GAME_STATE.gameEnded) {
        switch (GAME_STATE.stage) {
            case 0: //Welcome State
                printPlayerMessage(Chalk.bgBlack(messages.welcome))
                pause(1000)
                computerSetup(BOARDS)
                chooseBoard(BOARDS)
                pause(1000)
                console.clear()
                printPlayerMessage(Chalk.bgBlue.black(messages.startGame))
                anyKeyToContinue()
                GAME_STATE.stage += 1;
                break;
            case 1: // Player Turn
                console.clear()
                printTurnStartMessage(BOARDS)
                printBoardTitle()
                printStatus(BOARDS.player.shipLocation, BOARDS.computer.shipLocation)
                printBoard([BOARDS.player.fullBoard, BOARDS.computer.viewBoard])
                pause(1000)
                playerTurn(BOARDS)
                anyKeyToContinue()
                var checkWin = winCondition(BOARDS, 'computer')
                if (checkWin) {
                    GAME_STATE.gameWinnerPlayer = true
                    GAME_STATE.stage = 3
                    break
                }
                console.clear()
                GAME_STATE.stage += 1;
                break;
            case 2: // Computer Turn
                pause(1000)
                printPlayerMessage(Chalk.bgMagenta.black.bold(messages.computerTurnMessage))
                pause(2000)
                computerTurn(BOARDS)
                printBoard([BOARDS.player.fullBoard])
                anyKeyToContinue()
                var checkWin = winCondition(BOARDS, 'player')
                if (checkWin) {
                    GAME_STATE.gameWinnerPlayer = false
                    GAME_STATE.stage = 4
                    break
                }
                GAME_STATE.stage -= 1;
                break;
            case 3: // Game END Player won
                console.clear()
                printPlayerMessage(Chalk.bgBlack.yellow(messages.youWon))
                GAME_STATE.gameEnded = true
                break;
            case 4: // Game END computer won
                console.clear()
                printPlayerMessage(messages.youLost)
                GAME_STATE.gameEnded = true
                break;
            default:
            // code block
        }
    }
} 

//####################################

playBattleShip()
