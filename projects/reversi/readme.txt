Reversi Game design planning

rules
- The game starts with four discs in the center of the board: two white discs on one diagonal and two black discs on the other diagonal.
- Player decide which color to use throughout the game. Computer will use the other
- Players take turns placing their discs on the board with their color facing up.
- Each turn, you put one new piece onto the board.
- The piece must be laid adjacent to an opponent’s piece so that the opponent’s piece or a row of opponent’s pieces is flanked by the new piece and another piece of the player’s color.
- All opponent’s pieces between these two pieces are ‘captured’ and turned over to match the player’s color.
- It’s possible to capture pieces in multiple directions at once.

- End of game - The game ends when neither player has a legal move (i.e., a move that captures at least one opposing piece) or when the board is full.

- The winner is determined by counting the number of discs of each color on the board at the end of the game. The player with more discs of their color wins


Assumptions/guidelines
- Matrix (Array of Arrays)  of 8*8 wil present the board   
    - characters to present peices and potential moves
        - "w" - white player
        - "b" - black player
        - "wo" - white  player potential next move
        - "bo" - black  player potential next move
        - "e" - empty spot
- Start Game board
        
            0:(8) ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e']
            1:(8) ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e']
            2:(8) ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e']
            3:(8) ['e', 'e', 'e', 'w', 'b', 'e', 'e', 'e']
            4:(8) ['e', 'e', 'e', 'b', 'w', 'e', 'e', 'e']
            5:(8) ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e']
            6:(8) ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e']
            7:(8) ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e']
            length:8
