import inquirer from 'inquirer';
import { TicTacToeMove } from 'src';

export const promptUserForNextMove = (): Promise<TicTacToeMove> => {
  const questions = [
    {
      name: 'column',
      type: 'input',
      message: 'Enter the column for your next play',
      validate: function (value: number) {
        if (
          !isNaN(value) &&
          value >= 0 &&
          value <= 2 &&
          value.toString().length === 1
        ) {
          return true;
        } else {
          return 'Your input must be an integer between 0 and 2';
        }
      },
    },
    {
      name: 'row',
      type: 'input',
      message: 'Enter the row for your next play',
      validate: function (value: number) {
        if (
          !isNaN(value) &&
          value >= 0 &&
          value <= 2 &&
          value.toString().length === 1
        ) {
          return true;
        } else {
          return 'Your input must be an integer between 0 and 2';
        }
      },
    },
  ];

  return inquirer.prompt(questions);
};
