import CliTable from 'cli-table';
import { GameState } from 'src';

const isntEmptyString = (str: string) => str !== ' ';

export const getStateOfGame = (table: CliTable): GameState => {
  let gameState: GameState = {
    winner: null,
    coordinates: null,
    status: 'ongoing',
  };
  for (const [index, row] of table.entries()) {
    if (row[0] === row[1] && row[1] === row[2]) {
      if (isntEmptyString(row[0])) {
        gameState = {
          winner: row[0],
          coordinates: [
            [index, 0],
            [index, 1],
            [index, 2],
          ],
          status: 'finished',
        };
      }
    }
    // validate columns
    if (
      table[0][index] === table[1][index] &&
      table[1][index] === table[2][index]
    ) {
      if (isntEmptyString(table[0][index])) {
        gameState = {
          winner: table[0][index],
          coordinates: [
            [0, index],
            [1, index],
            [2, index],
          ],
          status: 'finished',
        };
      }
    }
    // validate diagonals
    if (index === 0) {
      if (table[0][0] === table[1][1] && table[1][1] === table[2][2]) {
        if (isntEmptyString(table[0][0])) {
          gameState = {
            winner: table[0][0],
            coordinates: [
              [0, 0],
              [1, 1],
              [2, 2],
            ],
            status: 'finished',
          };
        }
      }
    } else if (index === 2) {
      if (table[0][2] === table[1][1] && table[1][1] === table[2][0]) {
        if (isntEmptyString(table[0][2])) {
          gameState = {
            winner: table[0][2],
            coordinates: [
              [0, 2],
              [1, 1],
              [2, 0],
            ],
            status: 'finished',
          };
        }
      }
    }
  }

  const isDraw =
    table.filter((row) => row.filter((cell: string) => cell === ' ').length > 0)
      .length === 0 && !gameState.winner;

  if (isDraw) {
    return {
      winner: null,
      coordinates: null,
      status: 'finished',
    };
  }
  return gameState;
};
