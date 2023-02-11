import Chalk from 'chalk';
import { messages } from './messages.js';

export function printBoardTitle() {
    let size = 22
    let yourMessageSpacer = (size - messages.yourBoard.length - 2)/2
    let compMessageSpacer = (size - messages.compBoard.length - 2)/2
    console.log(
        Chalk.dim('#'.repeat(size)) + 
        ' '.repeat(5) + 
        Chalk.dim('#'.repeat(size))
    )
    
    console.log(
        Chalk.dim("#") +
        Chalk.dim(
            ' '.repeat(yourMessageSpacer) + messages.yourBoard + ' '.repeat(yourMessageSpacer)) + Chalk.dim("#") +
            ' '.repeat(5) + 
        Chalk.dim("#") +
        Chalk.yellow(
            ' '.repeat(compMessageSpacer) + messages.compBoard + ' '.repeat(compMessageSpacer)) + Chalk.dim("#")
    )

    console.log(
        Chalk.dim('#'.repeat(size)) +
        ' '.repeat(5) +
        Chalk.dim('#'.repeat(size))
    )
}

export function printStatus(yourShips, computerShips) {

    console.log(' '.repeat(10) + 'Size |' + ' Hits' + ' '.repeat(16) + 'Size |' + ' Hits' )

    function status(name, size, spacer, hits, sunk) {
        if (!sunk) {
            return Chalk.red(name) + " ".repeat(spacer) + " ".repeat(1) + size + "  |  " + hits
        }
        return Chalk.green(name) + " ".repeat(spacer) + "Sunk"
    };

    for (let i = 0; i < yourShips.length; i++) {
        let ship = yourShips[i];
        let ship2 = computerShips[i];
        let spacer = 11 - ship.name.length

        console.log(status(ship.name, ship.shipSize, spacer, ship.hitTotal, ship.shipSunk) + ' '.repeat(8) + status(ship2.name, ship2.shipSize, spacer, ship2.hitTotal, ship2.shipSunk))

    }
    console.log("\n")
}

export function printPlayerMessage(message) {
    console.log(message)
    return ''
}


export function printBoard(boards) {
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

    function boardLineReplacer(line) {
        let liner = line.join().replaceAll("0", "_").replaceAll("1", "O").replaceAll("X", Chalk.red("X")).replaceAll("✓", Chalk.bgGreen.black("✓"))
        return (liner)
    }

    let spacer = boards.length == 2 ? 5 : 3;

    console.log(Chalk.blue(`   A B C D E F G H I J${' '.repeat(spacer)}`.repeat(boards.length)))

    //loop through the board
    for (let i = 0; i < boards[0].length; i++) {
        let board1 = ''
        let board2 = ''
        let board3 = ''
        //If we're not on row 10, add a space because it's 2 digits 
        if (i != 9) {
            board1 = `${Chalk.yellow(i + 1)}  ${boardLineReplacer(boards[0][i])}${" ".repeat(spacer)}`

            if (boards[1]) {
                board2 = `${Chalk.yellow(i + 1)}  ${boardLineReplacer(boards[1][i])}${" ".repeat(spacer)}`
            }

            if (boards[2]) {
                board3 = `${Chalk.yellow(i + 1)}  ${boardLineReplacer(boards[2][i]) }${" ".repeat(spacer)}`
            }

            //print the row but replace the 0s (empty) with '_' and 1s (boat location) with 'O'
            console.log(`${board1 + board2 + board3}`)
        } else {
            board1 = `${Chalk.yellow(i + 1)} ${boardLineReplacer(boards[0][i])}${" ".repeat(spacer)}`

            if (boards[1]) {
                board2 = `${Chalk.yellow(i + 1)} ${boardLineReplacer(boards[1][i])}${" ".repeat(spacer)}`
            }

            if (boards[2]) {
                board3 = `${Chalk.yellow(i + 1)} ${boardLineReplacer(boards[2][i])}${" ".repeat(spacer)}`
            }
            console.log(`${board1 + board2 + board3}`)
        }
    }
    console.log('\n\n')

}


export function printTurnStartMessage(boards) {
    let lastMoveMessage = '';
    let spacerNum = 0
    if(boards.computer.lastMove) {
        spacerNum = 71 - boards.player.lastMove.length
        lastMoveMessage = Chalk.bold(`
                                                                          
   Computer's Last Move:                                                  
   ${boards.player.lastMove + " ".repeat(spacerNum) }`)
    }
    console.log(Chalk.bgMagenta.black.bold(
        `                                                                          
   It's your turn                                                         `),Chalk.bgMagenta.black(`
   Here is the current state of the game. You can hit anywhere from       
   A1 to J10 as long as it's not hit before.                              ${lastMoveMessage}
                                                                          
`))

}

export function computerTurnMessage() {
    console.log(Chalk.bgMagenta.black.bold(
        `                                                                          
   It's the computer's turn                                                         `), Chalk.bgMagenta.black(`
   Here is the current state of the game. You can hit anywhere from       
   A1 to J10 as long as it's not hit before.                              
                                                                          
`))

}

