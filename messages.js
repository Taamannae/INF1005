import Chalk from 'chalk';
const LABEL_SIZE = 50;
const EMOJI_LENGTH = 2;
const LABEL_INNER = LABEL_SIZE - (EMOJI_LENGTH * 2);

const PLAYER_INFO = {
    player: {
        HIT: {bg: 'bgRed',emoji: '🚨',},
        MISS: {bg: 'bgGreen',emoji: '😃'},
        SUNK: {bg: 'bgRed',emoji: '🚨',}
    },
    computer: {
        HIT: {bg: 'bgGreen',emoji: '🎉'},
        MISS: {bg: 'bgYellow',emoji: '😔'},
        SUNK: {bg: 'bgGreen',emoji: '🎉'},
    }
}

function sp(num) {
    /*
    Returns a string with only spaces equal to the num.
    NOTE: This was added for code clarity
    */
    return ' '.repeat(num)
}

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

`,  anyKeyToContinue:'Press any key to continue: ',
    boardNum: 'Select one of the above boards (1,2,3) to play on:  ',
    playerTurnPrompt: 'Where do you want to place a hit (A1 - J10)? ',
    computerTurnMessage:(sp(50) + "\n" +
    "   It's the computer's turn" + sp(23) + '\n' + sp(50) + "\n"
    ),
    boardTitles: function() {
        /**
         Returns the board titles so the player can see which board is their. Output is the following string:

         ######################     ######################
         #     Your Board     #     #  Computer's Board  #
         ######################     ######################

         */
        let size = 22
        let yourBoard = "Your Board";
        let compBoard = "Computer's Board"
        let yourSpace = (size - yourBoard.length - 2) / 2
        let compSpace = (size - compBoard.length - 2) / 2

        let message = (
            Chalk.dim('#'.repeat(size)) + sp(5) + Chalk.dim('#'.repeat(size)) + "\n" +
            Chalk.dim("#") +
            Chalk.dim(
                sp(yourSpace) + yourBoard + sp(yourSpace)) + Chalk.dim("#") +
            sp(5) +
            Chalk.dim("#") +
            Chalk.yellow(
                sp(compSpace) + compBoard + sp(compSpace)) + Chalk.dim("#\n") +
            Chalk.dim('#'.repeat(size)) + sp(5) + Chalk.dim('#'.repeat(size))
        )

        return message

    },
    chooseBoard: function() {
        let size = 22
        let one = "Option 1";
        let two = "Option 2";
        let three = "Option 3";
        let oneLen = (size - one.length - 2) / 2
        let twoLen = (size - two.length - 2) / 2
        let threeLen = (size - three.length - 2) / 2

        /*
        Returns a message urging the player to pick one of the boards and the titles of the options.
        */
        return (Chalk.bgMagenta.black(Chalk.bold(
        sp(70) + '\n' +
        `   Choose a board${sp(53) }\n`) +
        `   First, you must select a game board. Enter '1', '2', or '3'.${sp(7)}\n` +
        `   This will represent the placement of your ships that the computer${sp(2)}\n` +
        `   will try to hit${sp(52)}\n` +
        sp(70) + '\n'
        ) +
        Chalk.dim(
            '#'.repeat(size) + sp(3) + ('#'.repeat(size)) + sp(3) + ('#'.repeat(size)) + "\n" +
            
            "#" + sp(oneLen) + one + sp(oneLen) + "#" +
            sp(3) + "#" + sp(twoLen) + two + sp(twoLen) + "#" + sp(3) + "#" + sp(threeLen) + three + sp(threeLen) + "#\n" +

                '#'.repeat(size) + sp(3) + ('#'.repeat(size)) + sp(3) + ('#'.repeat(size)) + "\n"
        )
    )

},
    spotHitMessage: function (playerType, hitType, ship, spot ) {
        /*
        Returns the appropriate message for hit/sink moves for both
        the computer and the player. 

        For example:
        😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔
        😔                                       😔
        😔           Awwww! You missed.          😔
        😔                                       😔
        😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔😔
        
        */
        let label = playerType === 'player' ? `YAY! They hit ${ spot } & missed.` : `Awwww! You missed.`;

        if (hitType === "HIT" || hitType === "SUNK") {
            label = playerType === 'player' ? `Oh no! They hit ${spot} & ${hitType} your ${ship}.` : `Congrats! You ${hitType} their ${ship}.`;
        }

        // To center the text, the variability of the message needs to be taken into account. We need to mod it so we can still balance even and odd sized messages

        let fullSpace = (LABEL_INNER - label.length)
        let spacerNum = Math.floor(fullSpace / 2 )
        let leftOvers = fullSpace % 2
        let emoji = PLAYER_INFO[playerType][hitType].emoji
        let message = Chalk[PLAYER_INFO[playerType][hitType].bg].black(
            "\n" +
            emoji.repeat(LABEL_SIZE / 2) + "\n" +
            `${emoji + sp(LABEL_INNER) + emoji}\n` +
            `${emoji + sp(spacerNum) + label + sp(spacerNum + leftOvers) + emoji}\n` +
            `${emoji + sp(LABEL_INNER) + emoji}\n` +
            emoji.repeat(LABEL_SIZE / 2) + "\n"
        )
        return message;
    },
    playerStartTurnMessage: function(player) {
        /*
        Returns the message to show the start of the player's turn
        this includes displaying the computer's last move
        */
        let lastMoveMessage = '';
        let spacerNum = 0

        //if the last move exists
        if (player.lastMove) {
            spacerNum = LABEL_SIZE - player.lastMove.length - 3
            lastMoveMessage = Chalk.bold(
                `   Computer's Last Move:${sp(26)}\n` +
                `   ${player.lastMove + " ".repeat(spacerNum)}\n`+
                sp(50)
            )
        }

        let message = Chalk.bgMagenta.black(
            sp(LABEL_SIZE) + "\n" +
            Chalk.bgMagenta.black.bold(`   It's your turn${sp(33)}\n`) +
            `   Here is the current state of the game.${sp(9)}\n` +
            `   You can hit anywhere from A1 to J10${sp(12)}\n` +
            `   as long as it's not hit before.${sp(16)}\n` +
            sp(LABEL_SIZE) + '\n' +
            lastMoveMessage
        )
        return message

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