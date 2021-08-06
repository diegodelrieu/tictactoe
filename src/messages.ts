import boxen from 'boxen';
import chalk from 'chalk';
import clear from 'clear';
import CliTable from 'cli-table';
import { GameState, Player } from 'src';

export const displayEndMessage = ({
  table,
  gameState,
}: {
  table: CliTable;
  gameState: GameState;
}): void => {
  gameState!.coordinates.forEach((coordinate) => {
    table[coordinate[0]][coordinate[1]] = chalk.green(
      table[coordinate[0]][coordinate[1]],
    );
  });

  console.log(table.toString());
  console.log(
    boxen(
      chalk.green(
        `====================== ${
          gameState!.winner
        } wins! ======================`,
      ),
      { padding: 1, margin: 1, borderStyle: 'double' },
    ),
  );
};

export const displayStartMessage = (): void => {
  clear();
  console.log(
    boxen(
      chalk.cyanBright(
        `====================== TicTacToe ======================`,
      ),
      { padding: 1, margin: 1, borderStyle: 'double' },
    ),
  );
};

export const displayNextRoundMessage = (player: Player): void => {
  console.log(
    chalk.greenBright(
      `====================== ${player}'s turn to play ======================`,
    ),
  );
};

export const displaySpotTakenError = (): void =>
  console.log(chalk.red(`A player is already in that space.`));
