

[Click here to sum my Tic Tac Toe Simulator in all it's AWESOMENESS!!](https://jozzzaa.github.io/tic-tac-toe/)


# Instructions

The object of Tic Tac Toe is to get three in a row. The standard format for gameplay is based on a three by three grid game board. But, because mine is awesome, you can play a grid as large as you want. The first player is known as X and the second is O. Players alternate placing Xs and Os on the game board until either opponent has three in a row or all nine squares are filled. If no one achieve 3 in a row, the stalemate is called a cat game.


# Features

- Responsive Design, optimised for Desktop or Mobile. In case you wanna play on the go.
- Parallax Background with interactivity through mouse interaction, fancy stuff!
- Random selection for who begins first, or it wouldn't be fair.
- Ability to reset match at any time.
- Sexy scoring system allowing best of 3. <<Coming Soon
- Dynamic platform allowing board sizes of any size. Seriously who wants to play tic tac toe on a 10x10 board.
- Name Personalisation.
- Clear Interface to convey who's turn.
- Amazing Favicon so people can find the tab

# Formats / Workflows

- HTML all contained in single container to  manage width of active user interface.
- Intro Prompt and Game play held in additional wrappers with game display: none on load, this then switches once required user inputs have been entered. If required inputs, not entered, js will automatically apply default name values.
- Board will default load 3 x 3 on canvas load, unless other number entered. Board will load within the canvas area
- JS will load an identical array based board in the DOM and a winning array based on the board size input.
- Squares clicked are primarily implemented on the DOM, this is then translated to the HTML based on the DOM board.
- Scoring is built on mathematical principles of board expansion allowing scoring on all board sizes.
- All functions are built dynamic with little hard coding allowing for flexibility within the game interface.

# Difficulties / Unsolved Problems

- Reset button utilises a function to reload the page, however my goal would be to regenerate the dom, and html div (squares) rather than a full page reload. This is required at the end of each match.
- Scoring is not 100% dynamic for scoring on larger boards with bugs appearing.
- So thankful to harry for helping with the scoring as I spend 24 hours rewriting and rewriting code with no luck.
