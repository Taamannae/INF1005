import { messages } from "./messages.js";
import {printPlayerMessage, printBoard} from './printers.js'
import Chalk from 'chalk';

import promptSync from 'prompt-sync';
const prompt = promptSync()

export function anyKeyToContinue() {
    prompt(messages.anyKeyToContinue);
}

export function getRandomInt(max) {
    /*
    Input: Integer 
    Returns a random integer between 0 and the number provided
    */
    return Math.floor(Math.random() * max);
}

export function spotValidator(spot, board, ship) {
    /*
    Input: String

    Returns true if the spot the player wants to place the hit is valid on the board. Capitalization does not matter

    Examples

    Input: A12
    Output: false

    Input: 123
    Output: False

    Input: C7
    Output: true

    Input: b10
    Output: true
    */

    //Acceptable columns
    const LETTERS = "ABCDEFGHIJ";

    //The longest spot will be 3 chars (e.g A10)
    if (spot.length > 3 || spot.length == 0) {
        return false
    }
    //Parsing the row and column out
    let col = spot[0]; // The letter
    let row = parseInt(spot.slice(1)); // The number
    //Checks that Col is a letter from A-J and col is a number less than 11
    if (!LETTERS.includes(col.toUpperCase()) || isNaN(row) || row > 10) {
        return false
    }
    let realSpot = spotParser(spot)
    if (board[realSpot[0]][realSpot[1]] === "✓" || board[realSpot[0]][realSpot[1]] === "X") {
        return false
    }
    return true;
}

export function spotPrettify(spot) {
    return String.fromCharCode(65 + spot[1]) + (spot[0] + 1)
}

export function pause(milliseconds) {
    var dt = new Date();
    while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
}

export function spotParser(spot) {
    /*
    Input: string

    Return a machine readable array of the spot in [row, col] format

    Input: A10
    Output: [9,0]

    Input: C6
    Output: [5,2]

    */
    let col = spot[0];
    let row = parseInt(spot.slice(1));
    return [row - 1, parseInt(col, 36) - 10]
}

export function generateBoard() {
    /*
    Input: none
    Returns an array of the board and the coordinate location of the ships representing a playable battleship board

    Output: 
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 1, 1, 1, 1, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 1, 1, 1, 1, 1, 0],
            [1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ],
        [
            [ [4, 8], [4, 4],  name: 'Carrier', shipSize: 5 }],
            [ [1, 5], [1, 2], { name: 'Battleship', shipSize: 4 } ],
            [ [5, 2], [5, 0], { name: 'Cruiser', shipSize: 3 } ],
            [ [3, 7], [3, 5], { name: 'Submarine', shipSize: 3 } ],
            [ [2, 0], [1, 0], { name: 'Destroyer', shipSize: 2 } ]
        ]
    */

    //base board
    var board = [
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
    ];

    var SHIPS = [
        { name: "Carrier", shipSize: 5, hitTotal: 0, shipSunk: false, coords: [] },
        { name: "Battleship", shipSize: 4, hitTotal: 0, shipSunk: false, coords: [] },
        { name: "Cruiser", shipSize: 3, hitTotal: 0, shipSunk: false, coords: [] },
        { name: "Submarine", shipSize: 3, hitTotal: 0, shipSunk: false, coords: [] },
        { name: "Destroyer", shipSize: 2, hitTotal: 0, shipSunk: false, coords: [] },
    ]


    //tracking where the ships start and
    for (let ship = 0; ship < SHIPS.length; ship++) {
        var shipSize = SHIPS[ship].shipSize
        var shipComplete = false;

        while (!shipComplete) {
            // Coordinate for the start of the ship 
            const start = [getRandomInt(9), getRandomInt(9)];

            // Which way to face
            // UP=0, RIGHT=1, DOWN=2, LEFT=3
            const direction = getRandomInt(4);
            var end;

            // Make sure ship fits on the board
            if (direction == 0) {
                end = [start[0] - shipSize + 1, start[1]];
            } else if (direction == 1) {
                end = (start[0], start[1] + shipSize - 1)
            } else if (direction == 2) {
                end = (start[0] + shipSize - 1, start[1])
            } else if (direction == 3) {
                end = [start[0], start[1] - shipSize + 1]
            }

            if (!((end[0] >= 0 && end[0] <= 9) && (end[1] >= 0 && end[1] <= 9))) {
                continue;
            }

            const UDMin = Math.min(start[0], end[0]);
            const UDMax = Math.max(start[0], end[0]);
            const RLMin = Math.min(start[1], end[1]);
            const RLMax = Math.max(start[1], end[1]);
            // Check collision and add to board
            if (direction == 0) { // up
                var addedNum = 0;
                for (let i = UDMin; i <= UDMax + 1; i++) {
                    addedNum = addedNum + board[i][RLMax]
                }
                if (addedNum > 0) {
                    continue
                } else {
                    for (let i = UDMin; i <= UDMax; i++) {
                        board[i][RLMax] = 1
                        SHIPS[ship].coords.push([i, RLMax])
                    }
                }
            } else if (direction == 1) { // right
                var addedNum = 0;
                for (let i = RLMin; i <= RLMax + 1; i++) {
                    addedNum = addedNum + board[UDMax][i]
                }
                if (addedNum > 0) {
                    continue
                } else {
                    for (let i = RLMin; i <= RLMax; i++) {
                        board[UDMax][i] = 1
                        SHIPS[ship].coords.push([UDMax, i])

                    }
                }
            } else if (direction == 2) { // down
                var addedNum = 0;
                for (let i = UDMin; i <= UDMax + 1; i++) {
                    addedNum = addedNum + board[i][RLMax]
                }
                if (addedNum > 0) {
                    continue
                } else {
                    for (let i = UDMin; i <= UDMax; i++) {
                        board[i][RLMax] = 1
                        SHIPS[ship].coords.push([i, RLMax])

                    }
                }
            } else if (direction == 3) { // left
                addedNum = 0;
                for (let i = RLMin; i <= RLMax + 1; i++) {
                    addedNum = addedNum + board[UDMax][i]
                }
                if (addedNum > 0) {
                    continue
                } else {
                    for (let i = RLMin; i <= RLMax; i++) {
                        board[UDMax][i] = 1
                        SHIPS[ship].coords.push([UDMax, i])

                    }
                }
            }
            shipComplete = true;
        }
    }
    return [board, SHIPS];
}


export function computerTurn(boards) {
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

        if (checkHit(boards, 'player', spot) && !wasQueue) {
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


export function checkHit(boards, player, spot) {
    if (boards[player].fullBoard[spot[0]][spot[1]] == 1) {
        boards[player].viewBoard[spot[0]][spot[1]] = "✓"
        let hitShip = findShip(boards, player, spot)
        console.log(hitShip)
        return true
    } else {
        boards[player].viewBoard[spot[0]][spot[1]] = "X"
        boards[player].lastMove = `They hit ${spotPrettify(spot)} and missed`;
        console.log(messages.missedMessage(player, spotPrettify(spot)))
    }
    return false
}

function findShip(boards, player, spot) {
    //loop through the ships
    for (let i = 0; i < boards[player].shipLocation.length; i++) {
        //loop through the coords
        for (let j = 0; j < boards[player].shipLocation[i].coords.length; j++) {
            //Check if coord X matches the hit spot
            if (boards[player].shipLocation[i].coords[j][0] === spot[0]) {
                //Check if coord Y matches the hit spot
                if (boards[player].shipLocation[i].coords[j][1] === spot[1]) {

                    // Increase hit total of the ship
                    boards[player].shipLocation[i].hitTotal += 1;

                    // Check if the hit results in a sink by comparing hit total to shipsize
                    if (boards[player].shipLocation[i].hitTotal >= boards[player].shipLocation[i].shipSize) {
                        boards[player].shipLocation[i].shipSunk = true

                        boards[player].lastMove = `They hit ${spotPrettify(spot)} and SUNK your ${boards[player].shipLocation[i].name}`;
                        return messages.spotHitMessage(player, 'SUNK', boards[player].shipLocation[i].name, spotPrettify(spot))
                    }
                    boards[player].lastMove = `They hit ${spotPrettify(spot)} and HIT your ${boards[player].shipLocation[i].name}`;

                    return messages.spotHitMessage(player, 'HIT', boards[player].shipLocation[i].name, spotPrettify(spot))
                }
                continue
            } else {
                continue
            }
        }
    }
}

export function chooseBoard(boards) {
    let potentialBoards = [generateBoard(), generateBoard(), generateBoard()]
    printPlayerMessage(messages.chooseBoard())
    printBoard([potentialBoards[0][0], potentialBoards[1][0], potentialBoards[2][0]])

    var boardNum = prompt(messages.boardNum);

    while (boardNum.length == 0 || isNaN(boardNum) || boardNum < 0 || boardNum > 3) {
        boardNum = prompt('Sorry, not valid. Try again:  ');
        boardNum = parseInt(boardNum)
    }

    boards.player.fullBoard = potentialBoards[parseInt(boardNum) - 1][0]
    boards.player.viewBoard = potentialBoards[parseInt(boardNum) - 1][0]
    boards.player.shipLocation = potentialBoards[parseInt(boardNum) - 1][1]
}

export function playerTurn(boards) {
    var spot = prompt(messages.playerTurnPrompt);
    let valid = spotValidator(spot, boards.computer.viewBoard, boards.computer.shipLocation)
    while (!valid) {
        spot = prompt('Sorry, it must be alpha-numeric like "B9" that has not already been hit. Please try again: ');
        valid = spotValidator(spot, boards.computer.viewBoard)
    }
    spot = spotParser(spot)
    checkHit(boards, 'computer', spot)
}

export function winCondition(boards, player) {
    for (let i = 0; i < boards[player].shipLocation.length; i++) {
        if (boards[player].shipLocation[i].shipSunk) {
            continue
        }
        return false
    }
    return true
}

export function computerSetup(boards) {
    let computerBoard = generateBoard()
    boards.computer.fullBoard = computerBoard[0];
    boards.computer.shipLocation = computerBoard[1];
    return ''
}
