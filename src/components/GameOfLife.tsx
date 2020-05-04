import * as React from 'react';
import { FC, useState } from 'react';

type Board = boolean[][];

interface Props {
    speed: number;
    width: number;
    height: number;
}

const LIVE = '#';
const DEAD = '`';
const TOAD = [
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, true, true, true, false],
    [false, true, true, true, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
];

export const GameOfLife = ({ speed, width, height }: Props) => {
    const deadState = (width: number, height: number): Board => {
        const board: Board = [[]];
        for (let h = 0; h < height; h++) {
            if (!board[h]) {
                board.push([]);
            }
            for (let w = 0; w < width; w++) {
                board[h][w] = false;
            }
        }
        return board;
    };

    const DEAD_STATE = deadState(width, height);

    const randomState = (board: Board): Board => {
        const randomBoard: Board = JSON.parse(JSON.stringify(board));
        randomBoard.forEach((row) => {
            row.forEach((_cell, colIndex) => {
                const randNumb = Math.random();
                if (randNumb < 0.5) {
                    row[colIndex] = true;
                }
            });
        });
        return randomBoard;
    };

    const renderBoard = (board: Board) => {
        const row = board.length;
        const col = board[0].length;

        let output = '';

        let border = '--';
        for (let i = 0; i < row; i++) {
            border += '-';
        }
        border += '\n';
        output += border;

        for (let r = 0; r < row; r++) {
            let line = '|';
            for (let c = 0; c < col; c++) {
                if (board[r][c]) {
                    line += LIVE;
                } else {
                    line += DEAD;
                }
            }
            line += '|\n';
            output += line;
        }
        output += border;
        return output;
    };

    const nextBoardState = (board: Board): Board => {
        const nextBoard: Board = JSON.parse(JSON.stringify(board));
        const maxH = nextBoard.length;
        const maxL = nextBoard[0].length;
        for (let h = 0; h < maxH; h++) {
            for (let l = 0; l < maxL; l++) {
                nextBoard[h][l] = calculateGrowth(board, h, l);
            }
        }
        return nextBoard;
    };

    /** Check if cell should grow or die */
    const calculateGrowth = (board: Board, h: number, l: number): boolean => {
        let aliveAround = 0;
        const maxH = board.length;
        const maxL = board[0].length;

        for (let testH = h - 1; testH < h + 2; testH++) {
            for (let testL = l - 1; testL < l + 2; testL++) {
                if (
                    isInBounds(testH, testL, maxH, maxL) &&
                    !(testH === h && testL === l)
                ) {
                    if (board[testH][testL]) {
                        aliveAround++;
                    }
                }
            }
        }
        if (board[h][l]) {
            // cell is alive
            if (aliveAround <= 1 || aliveAround > 3) {
                return false;
            }
        } else {
            // cell is dead
            if (aliveAround === 3) {
                return true;
            }
        }
        return board[h][l];
    };

    /** Ensure coordiante being accessed is in bounds */
    const isInBounds = (
        h: number,
        l: number,
        maxH: number,
        maxL: number
    ): boolean => {
        if (h >= maxH || h < 0) return false;
        if (l >= maxL || l < 0) return false;
        return true;
    };

    const [boardState, setBoardState] = useState(
        randomState(deadState(width, height))
    );

    const run = (board: Board) => {
        setTimeout(() => {
            const next = nextBoardState(board);
            setBoardState(next);
        }, speed);
    };

    run(boardState);

    return (
        <div style={{ whiteSpace: 'pre-line' }}>{renderBoard(boardState)}</div>
    );
};

// const initState = deadState(20, 20);
// const randState = randomState(initState);
// run(randState);
