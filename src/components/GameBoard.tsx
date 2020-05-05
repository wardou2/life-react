import * as React from 'react';
import { Board } from './Interface';

import './GameBoard.scss';

interface Props {
    board: Board;
}

export const GameBoard = ({ board }: Props) => {
    const height = board.length;
    const width = board[0].length;

    return (
        <table className="container">
            <tbody>
                {board.map((row) => {
                    return (
                        <tr>
                            {row.map((cell) => {
                                return (
                                    <td
                                        className={`cell cell__${
                                            cell ? 'alive' : 'dead'
                                        }`}
                                        style={{
                                            width: `${100 / height}%`,
                                            paddingBottom: `${100 / height}%`,
                                        }}
                                    />
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};
