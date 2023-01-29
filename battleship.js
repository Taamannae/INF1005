const prompt = require('prompt-sync')();

var GAME_STATE = {
    stage: 0,
    gameEnded: false
}

messages = {
    welcome: "Hello, choose a thing",
    badSpot: 'Uh oh'
}


const SHIPS = [
    {name: "Carrier", shipSize: 5},
    {name: "Battleship", shipSize: 4},
    {name: "Cruiser", shipSize: 3},
    {name: "Submarine", shipSize: 3},
    {name: "Destroyer", shipSize: 2},
]


boards = {
    player: {
        fullBoard: undefined,
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
        fullBoard: generateBoard(),
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

function printBoard(board) {
    console.log('   A B C D E F G H I J')
    for (let i = 0; i < board.length; i++) {
        if (i != 9) {
            console.log(i + 1, '', board[i].join().replaceAll("0", "_").replaceAll("1", "O"))
        } else {
            console.log(i + 1, board[i].join().replaceAll("0", "_").replaceAll("1", "O"))
        }
    }
    return ''
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


function spotParser(spot) {
    const LETTERS = "ABCDEFGHIJ";
    if (spot.length > 3) {
       return messages.badSpot
    }
    let row = spot[0];
    let col = parseInt(spot.slice(1));
    if (!LETTERS.includes(row) || isNaN(col) || col > 10) {
        return messages.badSpot
    }
    return [parseInt(row, 36) - 10, col - 1]

}

function generateBoard() {
    board = [
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

    shipCoords = [];

    for (let ship = 0; ship < SHIPS.length; ship++) {
        shipSize = SHIPS[ship].shipSize
        shipComplete = false;

        while (!shipComplete) {
        // Coordinate for the start of the ship 
        start = [getRandomInt(9), getRandomInt(9)];
        
        // Which way to face
        // UP=0, RIGHT=1, DOWN=2, LEFT=3
        direction = getRandomInt(4);

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

        if (!((end[0] >= 0 && end[0] <= 9) && (end[1]>= 0 && end[1]<= 9))) {
            continue;
        }
        
        UDMin = Math.min(start[0], end[0]);
        UDMax = Math.max(start[0], end[0]);
        RLMin = Math.min(start[1], end[1]);
        RLMax = Math.max(start[1], end[1]);
        // Check collision and add to board
        if (direction == 0) { // up
            addedNum = 0;
            for (let i = UDMin; i <= UDMax + 1; i++) {
                addedNum = addedNum + board[i][RLMax]
            }
            if (addedNum > 0) {
                continue
            } else {
                for (let i = UDMin; i <= UDMax; i++) {
                    board[i][RLMax] = 1
                }
            }
        } else if (direction == 1) { // right
            addedNum = 0;
            for (let i = RLMin; i <= RLMax + 1; i++) {
                addedNum = addedNum + board[UDMax][i]
            }
            if (addedNum > 0) {
                continue
            } else {
                for (let i = RLMin; i <= RLMax; i++) {
                    board[UDMax][i] = 1
                }
            }
        }  else if (direction == 2) { // right
            addedNum = 0;
            for (let i = UDMin; i <= UDMax + 1; i++) {
                addedNum = addedNum + board[i][RLMax]
            }
            if (addedNum > 0) {
                continue
            } else {
                for (let i = UDMin; i <= UDMax; i++) {
                    board[i][RLMax] = 1
                }
            }
        } else if (direction == 3) { // right
            addedNum = 0;
            for (let i = RLMin; i <= RLMax + 1; i++) {
                addedNum = addedNum + board[UDMax][i]
            }
            if (addedNum > 0) {
                continue
            } else {
                for (let i = RLMin; i <= RLMax; i++) {
                    board[UDMax][i] = 1
                }
            }
        }
        shipCoords.push([start, end, SHIPS[ship]])
        shipComplete = true;
        }
    }
    return [board, shipCoords];
}

let potentialBoards = [generateBoard(), generateBoard(), generateBoard()]


function play() {
    while (!GAME_STATE.gameEnded) {
        switch (GAME_STATE.stage) {
            case 0: //Welcome State
                console.log(messages.welcome)
                console.log('1) Option 1')
                console.log(printBoard(potentialBoards[0][0]))
                console.log('2) Option 2')
                console.log(printBoard(potentialBoards[1][0]))
                console.log('3) Option 3')
                console.log(printBoard(potentialBoards[2][0]))
                
                var boardNum = prompt('Select one of the above boards to play on:');

                while ( isNaN(boardNum) || boardNum < 0 || boardNum > 3) {
                    boardNum = prompt('Sorry, not valid. Try again:  ');
                    boardNum = parseInt(boardNum)
                }

                boards.player.fullBoard = potentialBoards[parseInt(boardNum) - 1]
                boards.player.shipLocation = potentialBoards[parseInt(boardNum) - 1][1]
                console.log(boards.player.shipLocation);

                GAME_STATE.stage += 1;

                break;
            case 1: // Player Turn
                console.log('heleleloe')
                GAME_STATE.gameEnded = true
                break;
            case 2: // Computer Turn
                console.log('heleleloe')
                break;

            
            default:
            // code block
        }
    }
}

play()
