import Chalk from 'chalk';


export const messages = {
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
#  Ship Symbol Meanings:                                             #
#  O - Your Ship location, not hit yet                               #
#  X - Missed Spot                                                   #
#  ✓ - Hit Spot                                                      #
#                                                                    #
######################################################################
`,
    startGame: `

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~                                                                        ~
~                        Let's Start the Game                            ~
~                                  __/___                                ~
~                            _____/______|                               ~
~                    _______/_____\\_______\\_____                         ~
~                    \\              < < <       |                        ~
~                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                    ~
~                                                                        ~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

`,
    yourBoard: `Your Board`,
    compBoard: `Computer Board`,
    boardNum: 'Select one of the above boards (1,2,3) to play on:  ',
    playerTurnPrompt: 'Where do you want to place a hit (A1 - J10)? ',
    computerTurnMessage:
        `                                                                      
   It's the computer's turn                                           
                                                                      
`,
    spotHitMessage: function (playerType, hitType, ship) {
        let message = Chalk.bgGreen.black(`
🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉
🎉                                             🎉
🎉    Congrats! You ${hitType} their ${ship}   🎉
🎉                                             🎉
🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉

`)
        if (playerType === 'player') {
            message = Chalk.bgRed.black(`
🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨
🚨                                               🚨
🚨      Oh no! They ${hitType} your ${ship}        🚨
🚨                                               🚨
🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨
`
            )
        }
        return message;
    },
    missedMessage: function (playerType) {
        let message = Chalk.bgYellow.black(`
😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔
😔                                            😔
😔            Awwww! You missed               😔
😔                                            😔
😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔

`)
        if (playerType === 'player') {
            message = Chalk.bgGreen.black(`
🍾 🍾 🍾 🍾 🍾 🍾 🍾 🍾 🍾 🍾 🍾 🍾 🍾 🍾 🍾 🍾
🍾                                           🍾
🍾            YAY! They missed               🍾
🍾                                           🍾
🍾 🍾 🍾 🍾 🍾 🍾 🍾 🍾 🍾 🍾 🍾 🍾 🍾 🍾 🍾 🍾
`
            )
        }
        return message;
    }
}