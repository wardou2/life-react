import * as React from 'react';
import { useState, useEffect } from 'react';
import { Board } from './Interface';
import { GameBoard } from './GameBoard';

const SPEED = 180;
const WIDTH = 40;
const HEIGHT = 20;
const TOAD = [
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, true, true, true, false],
    [false, true, true, true, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
];
const GLIDER = [
    [false, true, false, false, false, false],
    [false, true, true, false, false, false],
    [true, false, true, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
];

export const GameOfLife = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [speed, setSpeed] = useState(SPEED);
    const [width, setWidth] = useState(WIDTH);
    const [height, setHeight] = useState(HEIGHT);

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

    const randomState = (board: Board): Board => {
        const randomBoard: Board = JSON.parse(JSON.stringify(board));
        randomBoard.forEach((row) => {
            row.forEach((_cell, colIndex) => {
                const randNumb = Math.random();
                if (randNumb < 0.2) {
                    row[colIndex] = true;
                }
            });
        });
        return randomBoard;
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
        }, Number(speed));
    };

    const handlePlay = (): void => {
        if (isRunning) return;
        setIsRunning(true);
        run(boardState);
    };

    useEffect(() => {
        setBoardState(randomState(deadState(width, height)));
    }, [width, height]);

    useEffect(() => {
        if (isRunning) run(boardState);
    }, [boardState]);

    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        switch (ev.target.name) {
            case 'width':
                setWidth(Number(ev.target.value));
                break;
            case 'height':
                setHeight(Number(ev.target.value));
                break;
            case 'speed':
                setSpeed(Number(ev.target.value));
                break;
        }
    };

    return (
        <>
            {!isRunning && (
                <GameControls
                    speed={speed}
                    height={height}
                    width={width}
                    handleChange={handleChange}
                    handlePlay={handlePlay}
                />
            )}
            {isRunning && (
                <div style={{ width: `100%` }}>
                    <GameBoard board={boardState} />
                </div>
            )}
        </>
    );
};

const GameControls = ({
    speed,
    height,
    width,
    handleChange,
    handlePlay,
}: {
    speed: number;
    height: number;
    width: number;
    handleChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
    handlePlay: () => void;
}) => {
    return (
        <div>
            <form>
                <label> Speed: {speed} ms</label>
                <input
                    type="range"
                    step="1"
                    min="10"
                    max="1000"
                    name="speed"
                    value={speed}
                    onChange={handleChange}
                />
                <br />
                <label> Height: </label>
                <input
                    type="number"
                    value={height}
                    name="height"
                    onChange={handleChange}
                />
                <br />
                <label> Width: </label>
                <input
                    type="number"
                    value={width}
                    name="width"
                    onChange={handleChange}
                />
                <br />
                <button onClick={handlePlay}>Click me!</button>
            </form>
        </div>
    );
};
