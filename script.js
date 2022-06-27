const boxes = document.querySelectorAll('.board-box');

const Gameboard = (() => {
    let board = ['','','','','','','','',''];

    const renderContents = () => {
        for (let index = 0; index < board.length; index++) {
            const currBox = board[index];
            boxes[index].textContent = currBox;
            
        }
    }

    const _checkHorizontalWin = () => {
        for (let index = 0; index < 7; index += 3) {
            const currRow = board[index];
            if(currRow == board[index + 1] && currRow == board[index + 2]){
                return currRow;
            }
            
        }
        return null;
    }

    const _checkVerticalWin = () => {
        for (let index = 0; index < 3; index++) {
            const currCol = board[index];
            if(currCol == board[index + 3] && currCol == board[index + 6]){
                return currCol;
            }
            
        }
        return null;
    }

    const _checkDescendingWin = () => {
        if(board[0] == board[4] && board[0] == board[8]){
            return board[0];
        }
        return null;
    }

    const _checkAscendingWin = () => {
        if(board[2] == board[4] && board[2] == board[6]){
            return board[2];
        }
        return null;
    }

    const checkWin = () => {
        let winner =  (_checkHorizontalWin() || _checkVerticalWin() || _checkAscendingWin() || _checkDescendingWin());
        
        if(winner == 'X'){
            alert('Player 1 Wins');
        }else if(winner == 'O'){
            alert('Player 2 Wins');
        }
        return winner;
    }

    const checkDraw = () => {
        if(!board.includes('') == true){
            alert("Draw!")
        }
        return !board.includes('');
    }

    const resetBoard = () => {
        for (let index = 0; index < 9; index++) {
            board[index] = '';
        }
        renderContents();
    }

    return{
        board,
        renderContents,
        checkWin,
        resetBoard,
        checkDraw
    };
})();

const Player = (symbol) => {
    const move = symbol;
    const makeMove = position =>{
        let targetBox = Gameboard.board[position];

        if(targetBox == ''){
            Gameboard.board[position] = move;
            Gameboard.renderContents();
            // succesfull 
            return 1;
        }
        return 0;
    }

    return{
        makeMove
    };
}

const gameControl = (()=>{
    const player1 = Player("X");
    const player2 = Player("O");
    let currPlayer = 1;

    Gameboard.renderContents();

    

    boxes.forEach( (box) => {
        box.addEventListener('click', () => {
            if(currPlayer == 1 && player1.makeMove(box.id) == 1){
                player1.makeMove(box.id);
                currPlayer++;
            }else if(currPlayer == 2 && player2.makeMove(box.id) == 1){
                player2.makeMove(box.id);
                currPlayer--;
            }
            setTimeout(() => {
                let winner = Gameboard.checkWin();
                if(winner != null || Gameboard.checkDraw() == true){
                    Gameboard.resetBoard();
                    currPlayer = 1;
                }
            },100);
            
        });
    
    });

    

})();

