import Chalk from 'chalk';
import { messages } from './messages.js';

export function printPlayerViewBoardsHorizontal(board1, board2) {
    console.log(Chalk.bgGreen.black('                      ') + '    ' + Chalk.bgGreen.black('                     '))
    console.log(Chalk.bgGreen.black(`      ${messages.yourBoard}      `) + '    ' + Chalk.bgGreen.black(`   ${messages.compBoard}    `))
    console.log(Chalk.bgGreen.black('                      ') + '    ' + Chalk.bgGreen.black('                     \n'))
    console.log('   A B C D E F G H I J      A B C D E F G H I J')

    //loop through the board
    for (let i = 0; i < board1.length; i++) {
        //If we're not on row 10, add a space because it's 2 digits 
        if (i != 9) {
            //print the row but replace the 0s (empty) with '_' and 1s (boat location) with 'O'
            console.log(i + 1, '',
                board1[i].join().replaceAll("0", "_").replaceAll("1", "O"), ' ',
                i + 1, '',
                board2[i].join().replaceAll("0", "_").replaceAll("1", "O"))
        } else {
            console.log(i + 1, board1[i].join().replaceAll("0", "_").replaceAll("1", "O"), ' ', i + 1, board2[i].join().replaceAll("0", "_").replaceAll("1", "O"))
        }
    }
    console.log('\n\n')
}


export function printBoardChoiceHorizontal(board1, board2, board3) {
    console.log(Chalk.bgMagenta.black.bold(
        `                                                                         
   Choose a board                                                        `), Chalk.bgMagenta.black(`
   First, you must select a game board. Enter '1', '2', or '3'.          
   This will represent the placement of your ships that the computer     
   will try to hit                                                       
                                                                         

   ###################     ###################     ###################   
   #     Option 1    #     #     Option 2    #     #     Option 3    #   
   ###################     ###################     ###################   
`))

    console.log('   A B C D E F G H I J      A B C D E F G H I J      A B C D E F G H I J')

    //loop through the board
    for (let i = 0; i < board1.length; i++) {
        //If we're not on row 10, add a space because it's 2 digits 
        if (i != 9) {
            //print the row but replace the 0s (empty) with '_' and 1s (boat location) with 'O'
            console.log(i + 1, '',
                board1[i].join().replaceAll("0", "_").replaceAll("1", "O"), ' ',
                i + 1, '',
                board2[i].join().replaceAll("0", "_").replaceAll("1", "O"), ' ',
                i + 1, '',
                board3[i].join().replaceAll("0", "_").replaceAll("1", "O"))
        } else {
            console.log(i + 1, board1[i].join().replaceAll("0", "_").replaceAll("1", "O"), ' ', i + 1, board2[i].join().replaceAll("0", "_").replaceAll("1", "O"), ' ', i + 1, board3[i].join().replaceAll("0", "_").replaceAll("1", "O"))
        }
    }
    console.log('\n\n')

}


export function printTurnStartMessage() {
    console.log(Chalk.bgMagenta.black.bold(
        `                                                                          
   It's your turn                                                         `),Chalk.bgMagenta.black(`
   Here is the current state of the game. You can hit anywhere from       
   A1 to J10 as long as it's not hit before.                              
                                                                          
`))

}
