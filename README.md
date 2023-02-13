# INF1005

        ______       _   _   _        _____ _     _                 
        | ___ \     | | | | | |      /  ___| |   (_)                
        | |_/ / __ _| |_| |_| | ___  \ `--.| | __ _ _ __            
        | ___ \/ _` | __| __| |/ _ \  `--. \ '_ \| | '_ \           
        | |_/ / (_| | |_| |_| |  __/ /\__/ / | | | | |_) |          
        \____/ \__,_|\__|\__|_|\___| \____/|_| |_|_| .__/           
                                                 | |                
                                                 |_|                
                                       )___(                        
                                _______/__/_                        
                        ___     /===========|   ___                 
        ____       __   [\\\]___/____________|__[///]   __          
        \   \_____[\]__/___________________________\__[//]_____     
         \ INF1005                                            /     
          \                                                  /      
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  
This is a Node RELP battleship game. You will play against the computer in a battle to sink the other's ships. You will be given 3 randomly generated boards preloaded with ships. From there, you and the computer will take turns picking spots on the board to hit. The first to sink all 5 ships will win the game.
## How to start
Step 1

```shell
npm install
```

Step 2
```shell
node battleship.js
```

## Authors
Taamannae Taabassum & Jennifer Deng

## General Notes
### Computer Moves
There is only 1 difficulty mode for this game. The computer is smart but not fully optimized to make the best move possible. Once a spot has been hit, it'll store a number of potential spots that could contain the next part of the ship to hit later. However, it doesn't pick them optimally and it doesn't know when a ship has sunk to stop trying for that ship. 

**How to make the computer smarter for future iterations**
1. For future iterations, ship sinking and hit direction could be tracked for a harder opponent for the player.
2. To make it even harder, the computer can check the distance between existing hits and the remaining ship sizes to make predictions about where ships may or may not be.

### Horizontal Printing
To save space and improve the "User Interface", we had to print the boards horizontally. This is why a lot of logic uses repeating spaces so that we can print one line of each of the boards on the same line.
