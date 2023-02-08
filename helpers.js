

export function printStatus(SHIPS) {
    console.log("Computer Board Status");
    let cumulativeHits = 0;
    for (let i = 0; i < SHIPS.length; i++) {
      let ship = SHIPS[i];
      cumulativeHits += ship.hitTotal;
        console.log(ship.name + " (" + ship.shipSize+ ")" + ": " + (ship.shipSunk ? "Sunk" : "Not Sunk"))
      ;}
      console.log("Total Hits: " + cumulativeHits);
    
  }

export function print(message) {
    console.log(message)
    return ''
}

export function printBoard(board) {
    /*
    Input: An array of arrays
    This function will take a board (an array of arrays)
    and print out the stylized, prettified version of that board. The intention is so the player has a cleaner game view

    Example:

    Input: 
    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]

    Output:    
           A B C D E F G H I J
        1  _,_,_,_,_,_,_,_,_,_
        2  O,O,O,O,O,_,_,_,_,_
        3  _,_,_,O,_,_,_,_,_,_
        4  _,_,_,O,_,_,_,_,_,_
        5  _,_,_,O,_,_,_,_,_,_
        6  _,_,_,_,_,O,O,O,_,_
        7  _,_,_,_,_,O,_,_,O,_
        8  _,_,_,_,_,O,_,_,O,_
        9  _,_,_,_,_,O,_,_,O,_
        10 _,_,_,_,_,_,_,_,_,_
    */

    // Print the column headers
    console.log('   A B C D E F G H I J')

    //loop through the board
    for (let i = 0; i < board.length; i++) {
        //If we're not on row 10, add a space because it's 2 digits 
        if (i != 9) {
            //print the row but replace the 0s (empty) with '_' and 1s (boat location) with 'O'
            console.log(i + 1, '', board[i].join().replaceAll("0", "_").replaceAll("1", "O"))
        } else {
            console.log(i + 1, board[i].join().replaceAll("0", "_").replaceAll("1", "O"))
        }
    }
    console.log('\n\n')

    return ''
}

export function getRandomInt(max) {
    /*
    Input: Integer 
    Returns a random integer between 0 and the number provided
    */
    return Math.floor(Math.random() * max);
}

export function spotValidator(spot, board) {
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
            } else if (direction == 2) { // right
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
                        SHIPS[ship].coords.push([UDMax, i])

                    }
                }
            }
            shipComplete = true;
        }
    }
    return [board, SHIPS];
}