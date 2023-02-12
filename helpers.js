import { messages } from "./messages.js";
import { printPlayerMessage, printBoard, printStatus } from './printers.js'
import Chalk from 'chalk';

import promptSync from 'prompt-sync';
const prompt = promptSync()

export function anyKeyToContinue() {
    /*
    Input: None 
    Output: None
    ------------------
    Provides a moment of pause so the player can read content and then
    move on when they are ready to continue.
    */
    prompt(messages.anyKeyToContinue);
}

export function getRandomInt(max) {
    /*
    Input: Integer
    Output: Integer
    ------------------ 
    Returns a random integer between 0 and the number provided
    */
    return Math.floor(Math.random() * max);
}

export function spotValidator(spot, board) {
    /*
    Input: String, and playable board
    Output: Boolean
    ------------------
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
    /*
    Input: Array of Integer
    Output: String 
    Returns a prettified, player readable version of the target spot

    Examples:
    Input: [9,0]
    Output: A10

    Input: [5,2]
    Output: C6

    */
    return String.fromCharCode(65 + spot[1]) + (spot[0] + 1)
}

export function pause(milliseconds) {
    /*
    Input: Integer (Time in milliseconds)
    Output: None 
    ---------------------------------
    Pauses the game for the given amount of time. Used to slow down the computer's moves so the player can keep up and understand what's happening. 
    */

    // Using this methods since setTimeout is asynchronous
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

    // All the ships in the game and their locations on the board
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
            const start = [getRandomInt(10), getRandomInt(10)];

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

            // Check if the ships stays on the board
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
                // Checking if there are any ships in the way
                for (let i = UDMin; i <= UDMax; i++) {
                    // console.log(board[i])
                    // console.log(RLMax)
                    addedNum = addedNum + board[i][RLMax]

                }
                if (addedNum > 0) {
                    continue
                } else {
                    // Add the ship to the board and the ship location
                    for (let i = UDMin; i <= UDMax; i++) {
                        board[i][RLMax] = 1
                        SHIPS[ship].coords.push([i, RLMax])
                    }
                }
            } else if (direction == 1) { // right
                var addedNum = 0;
                for (let i = RLMin; i <= RLMax; i++) {
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
                for (let i = UDMin; i <= UDMax; i++) {
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
                for (let i = RLMin; i <= RLMax; i++) {
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
    /*
    Input: Playable board
    Output: None
    ---------------------------------
    Takes the player's board and places a hit on a reasonable spot.
    We tried to keep the computer's move smart but not too smart so the
    player has a chance.

    */
    printPlayerMessage(Chalk.bgMagenta.black.bold(messages.computerTurnMessage))
    pause(2000)
    var successfulSpot = false;
    while (!successfulSpot) {
        var wasQueue = false
        // Starting Random
        var spot = [getRandomInt(10), getRandomInt(10)];

        // Keeping track of other potential spots to check if a previous spot was a hit
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

        // Making sure we don't hit places already hit before
        if (boards.player.viewBoard[spot[0]][spot[1]] == 'X' || boards.player.viewBoard[spot[0]][spot[1]] == '✓') {
            continue
        }

        if (checkHit(boards, 'player', spot) && !wasQueue) {
            // If we hit a new ship, add the horizontal and vertical squares nearby to be checked next turn to try and sink it before trying
            // any more random guesses.
            for (let i = 1; i <= 4; ++i) {
                if (spot[0] - i >= 0) {
                    boards.computer.computerQueue.push([spot[0] - i, spot[1]]);
                    boards.computer.computerQueue.push([spot[0] - i + 1, spot[1]]);
                }
                if (spot[0] + i <= 9) {
                    boards.computer.computerQueue.push([spot[0] + i, spot[1]]);
                    boards.computer.computerQueue.push([spot[0] + i - 1, spot[1]]);
                }
                if (spot[1] - i >= 0) {
                    boards.computer.computerQueue.push([spot[0], spot[1] - i]);
                    boards.computer.computerQueue.push([spot[0], spot[1] - i + 1]);
                }
                if (spot[1] + i <= 9) {
                    boards.computer.computerQueue.push([spot[0], spot[1] + i]);
                    boards.computer.computerQueue.push([spot[0], spot[1] + i - 1]);
                }
            }
        }
        successfulSpot = true;
    }
} 


export function checkHit(boards, player, spot) {
    /*
    Input: Playable boards, the current player, the spot targeted
    Output: Boolean

    Returns true if the targeted spot is a hit and prints the corresponding
    message for the player
    */
    if (boards[player].fullBoard[spot[0]][spot[1]] == 1) {
        boards[player].viewBoard[spot[0]][spot[1]] = "✓"
        let hitShip = findShip(boards, player, spot)
        printPlayerMessage(hitShip)
        return true
    } else {
        boards[player].viewBoard[spot[0]][spot[1]] = "X";

        // Tracks the last miss move to show the player
        boards[player].lastMove = `They hit ${spotPrettify(spot)} and missed`;
        printPlayerMessage(messages.spotHitMessage(player, 'MISS', 'None', spotPrettify(spot)))
    }
    return false
}

function findShip(boards, player, spot) {
    /*
    Input: Playable boards, the current player, the spot targeted
    Output: The hit/sink/= message for the player 

    Once a hit has been successful, this function finds the corresponding 
    ship and updates the hit count, sink status and returns a human readable
    message for the player
    
    */

    //loop through the ships
    for (let i = 0; i < boards[player].shipLocation.length; i++) {
        //loop through the coords
        for (let j = 0; j < boards[player].shipLocation[i].coords.length; j++) {
            //Check if coord X matches the hit spot

            let currentSpot = boards[player].shipLocation[i].coords[j].join().replaceAll(',', '')
            if (currentSpot === spot.join().replaceAll(',', '')) {
                // Increase hit total of the ship
                boards[player].shipLocation[i].hitTotal += 1;

                // Check if the hit results in a sink by comparing hit total to shipsize
                if (boards[player].shipLocation[i].hitTotal >= boards[player].shipLocation[i].shipSize) {
                    boards[player].shipLocation[i].shipSunk = true

                    boards[player].lastMove = `They hit ${spotPrettify(spot)} and SUNK your ${boards[player].shipLocation[i].name}`;

                    // We return instead of print since we want the loop to stop once the hit has been found.
                    return messages.spotHitMessage(player, 'SUNK', boards[player].shipLocation[i].name, spotPrettify(spot))
                }
                boards[player].lastMove = `They hit ${spotPrettify(spot)} and HIT your ${boards[player].shipLocation[i].name}`;

                return messages.spotHitMessage(player, 'HIT', boards[player].shipLocation[i].name, spotPrettify(spot))
            }
        }
    }
}

export function chooseBoard(boards) {
    /*
    Input: The boards where info will be saved

    Generates 3 potential boards, prints them, lets the player pick one
    and saves that one to the data storage.

    */

    // Generate 3 random boards
    let potentialBoards = [generateBoard(), generateBoard(), generateBoard()]
    
    printPlayerMessage(messages.chooseBoard())

    // Displays all the boards horizontally
    printBoard([potentialBoards[0][0], potentialBoards[1][0], potentialBoards[2][0]])

    //Prompts to pick one
    var boardNum = prompt(messages.boardNum);
    while (boardNum.length == 0 || isNaN(boardNum) || boardNum < 0 || boardNum > 3) {
        boardNum = prompt('Sorry, not valid. Try again: ');
        boardNum = parseInt(boardNum)
    }

    // Updates the data storage with the board to play
    boards.player.fullBoard = potentialBoards[parseInt(boardNum) - 1][0]
    boards.player.viewBoard = potentialBoards[parseInt(boardNum) - 1][0]
    boards.player.shipLocation = potentialBoards[parseInt(boardNum) - 1][1]
}

export function playerTurn(boards) {
    /*
    Input: Playable boards
    Output: None

    Prompt player to pick a spot and place the spot if
    it's a valid spot and if it hasn't been selected before

    */
    printStatus(boards.player.shipLocation, boards.computer.shipLocation, boards.player)
    printBoard([boards.player.viewBoard, boards.computer.viewBoard])

    var spot = prompt(messages.playerTurnPrompt);
    let valid = spotValidator(spot, boards.computer.viewBoard, boards.computer.shipLocation)

    //Keep prompting until they pick a good spot
    while (!valid) {
        spot = prompt('Sorry, it must be alpha-numeric like "B9" that has not already been hit. Please try again: ');
        valid = spotValidator(spot, boards.computer.viewBoard)
    }
    // Place the hit on the board
    spot = spotParser(spot)
    checkHit(boards, 'computer', spot)
}

export function winCondition(boards, player) {
    /*
    Input: Playable boards, current turn
    Output: Boolean
    -------------------------------
    Return true if the player's current board is a win
    */

    for (let i = 0; i < boards[player].shipLocation.length; i++) {
        if (boards[player].shipLocation[i].shipSunk) {
            continue
        }
        // If any ship sunk is not true, then the game is not over yet
        return false
    }
    return true
}

export function computerSetup(boards) {
    /*
    Input: Boards where data is stored
    Output: None
    -------------------------------
    Generates a playable board for the computer and saves
    it
    */
    let computerBoard = generateBoard()
    boards.computer.fullBoard = computerBoard[0];
    boards.computer.shipLocation = computerBoard[1];
}