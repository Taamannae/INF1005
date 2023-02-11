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
#     and sink your ship.                                            #
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
~               _        _   _      ___ _            _                   ~
~              | |   ___| |_( )___ / __| |_ __ _ _ _| |_                 ~
~              | |__/ -_)  _|/(_-< \\__ \\  _/ _\` | '_|  _|                ~
~              |____\\___|\\__| /__/ |___/\\__\\__,_|_|  \\__|                ~
~                                                                        ~
~                                  __/___                                ~
~                            _____/______|                               ~
~                    _______/_____\\_______\\_____                         ~
~                    \\              < < <       |                        ~
~                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                    ~
~                                                                        ~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

`, anyKeyToContinue:'Press any key to continue: ',
    help: `
    While playing you can use the following commands:
    1. help - The message you're seeing now. It'll show you a list of possible commands,
    2. status - Displays the current ship states of the opponent
    3. rules - Displays the rules shown at the beginning
    `,
    yourBoard: `Your Board`,
    compBoard: `Computer Board`,
    boardNum: 'Select one of the above boards (1,2,3) to play on:  ',
    playerTurnPrompt: 'Where do you want to place a hit (A1 - J10)? ',
    computerTurnMessage:
        `                                                                      
   It's the computer's turn                                           
                                                                      
`,
chooseBoard: function() {
    return Chalk.bgMagenta.black.bold(
        `                                                                         
   Choose a board                                                        `)+ Chalk.bgMagenta.black(`
   First, you must select a game board. Enter '1', '2', or '3'.          
   This will represent the placement of your ships that the computer     
   will try to hit                                                       
                                                                         `) +
    Chalk.dim(`\n
   ###################      ###################      ###################   
   #     Option 1    #      #     Option 2    #      #     Option 3    #   
   ###################      ###################      ###################   
`)

},
    spotHitMessage: function (playerType, hitType, ship, spot) {
        let spacerNum = Math.floor((54 - 22 - hitType.length - ship.length) / 2)
        let message = Chalk.bgGreen.black(`
🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉
🎉                                                      🎉
🎉${' '.repeat(spacerNum)}Congrats! You ${hitType} their ${ship}.${' '.repeat(spacerNum)}🎉
🎉                                                      🎉
🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉

`)
        if (playerType === 'player') {
            let spacerNum = Math.floor((54 - 28 - spot.length - hitType.length - ship.length) / 2)
            message = Chalk.bgRed.black(`
🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨
🚨                                                      🚨
🚨${' '.repeat(spacerNum)}Oh no! They hit ${spot} and ${hitType} your ${ship}.${' '.repeat(spacerNum)}🚨
🚨                                                      🚨
🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨
`
            )
        }
        return message;
    },
    missedMessage: function (playerType, spot) {
        let message = Chalk.bgYellow.black(`
😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔
😔                                            😔
😔            Awwww! You missed.              😔
😔                                            😔
😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔

`)
        if (playerType === 'player') {
            let spacerNum = Math.floor((44 - 26 - spot.length)/2)
            message = Chalk.bgGreen.black(`
😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃
😃                                            😃
😃${' '.repeat(spacerNum)}YAY! They hit ${spot} and missed.${' '.repeat(spacerNum) }😃
😃                                            😃
😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃
`
            )
        }
        return message;
    },
    youWon: `
                                                                     
           __  __                 _       __                         
           \\ \\/ /____   __  __   | |     / /____   ____              
           \\  // __ \\ / / / /   | | /| / // __ \\ / __ \\              
           / // /_/ // /_/ /    | |/ |/ // /_/ // / / /              
           /_/ \\____/ \\__,_/     |__/|__/ \\____//_/ /_/              
                                                                     
           Congrats! You won against the computer. Woo hoo           
                                          .''.                       
              .''.      .        *''*    :_\\/_:     .                
             :_\\/_:   _\\(/_  .:.*_\\/_*   : /\\ :  .'.:.'.             
         .''.: /\\ :    /)\\   ':'* /\\ *  : '..'.  -=:o:=-             
        :_\\/_:'.:::.  | ' *''*    * '.\\'/.'_\\(/_'.':'.'              
        : /\\ : :::::  =  *_\\/_*     -= o =- /)\\    '  *              
         '..'  ':::' === * /\\ *     .'/.\\'.  ' ._____                
             *        |   *..*         :       |.   |' .---"|        
               *      |     _           .--'|  ||   | _|    |        
               *      |  .-'|       __  |   |  |    ||      |        
            .-----.   |  |' |  ||  |  | |   |  |    ||      |        
        ___'       ' /"\\ |  '-."".    '-'   '-.'    '\\\`     |        
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  ~ ~-~-~-~-~-~-~-~-~-~                   /|                         
~~~~~      ~-~-~-~-~-~-~-~    /|~       /_ |\\  ~~~~~~~~~~   ~~~~~~~~ 
           - ~-~-~-~-~-~     /_|\\    -~======-~   ~~~~~~~~~~~~~~~~~  
~-~-~-~-~ ~     ~-~-~-~     /__|_\\ ~-~-~-~            ~~~~~~~~~~    
~-~-~-~    ~-~~-~-~-~-~    ======== ~-~-~-~           ~~~~~          `,     
    youLost: `
                                                                     
            __  __               __               __                 
            \\ \\/ /___  __  __   / /   ____  _____/ /_                
             \\  / __ \\/ / / /  / /   / __ \\/ ___/ __/                
             / / /_/ / /_/ /  / /___/ /_/ (__  ) /_                  
            /_/\\____/\\__,_/  /_____/\\____/____/\\__/                  
                                                                     
           Awww! You lost against the computer. Too bad              
                                    ______                           
          __________        .----"""      """----.                   
        : ______.-' :      :   .--------------.   :                  
        |  ______   |      |  :                :  |                  
        | :______B: |      |  |    |      |    |  |                  
        | :______B: |      |  |    |      |    |  |                  
        | :______B: |      |  |                |  |                  
        |           |      |  |    _       _   |  |                  
        | :_____:   |      |  |     \\     /    |  |                  
        |     ==    |      |  :      -----     :  |                  
        |        O  |      :  '--------------'    :                  
        |        o  |       :'---..._______...---'                   
        |        o  |-._.-i___/'             \\._                     
        | '-.____o_ |   '-..  '-...______...-'  \`-._                 
        : _________ :       \`.________________     \` -.__.--.        
                           /.eeeeeeeeeeeeeeeeee.\\       : ___:       
                         /.eeeeeeeeeeeeeeeeeeeeee.\\                  
                        :---------------------------:                
                                                                     `
}