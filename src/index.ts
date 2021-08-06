import CliTable from 'cli-table';
import { promptUserForNextMove } from './inquirer';
import {
  displayEndMessage,
  displayNextRoundMessage,
  displaySpotTakenError,
  displayStartMessage,
} from './messages';
import { getStateOfGame } from './state';

export type TicTacToeMove = {
  column: number;
  row: number;
};

export type Player = 'X' | 'O';

export type GameState = null | {
  winner: Player;
  coordinates: number[][];
};

const playARound = async ({
  nextPlayer,
  table,
}: {
  nextPlayer: Player;
  table: CliTable;
}) => {
  const nextMove: TicTacToeMove = await promptUserForNextMove();
  if (
    table[nextMove.row][nextMove.column] &&
    table[nextMove.row][nextMove.column] !== ' '
  ) {
    displaySpotTakenError();
    return { status: 'invalid' };
  }
  table[nextMove.row][nextMove.column] = nextPlayer;

  return { status: 'valid' };
};

const startTicTacToe = async () => {
  displayStartMessage();
  const { table } = getTable();
  let nextPlayer: Player = 'X';
  let gameState = getStateOfGame(table);

  while (!gameState) {
    displayNextRoundMessage(nextPlayer);
    const { status } = await playARound({ nextPlayer, table });
    gameState = getStateOfGame(table);
    if (status === 'valid') {
      nextPlayer = nextPlayer === 'X' ? 'O' : 'X';
    }
  }

  displayEndMessage({ table, gameState });
};

const getTable = () => {
  const table = new CliTable();
  table.push([' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']);
  return { table };
};

startTicTacToe();
