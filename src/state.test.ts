import { getStateOfGame } from './state';
import CliTable from 'cli-table';

const gameStates = [
  {
    matrix: [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' '],
    ],
    description: 'an empty matrix',
    expectedState: {
      winner: null,
      coordinates: null,
      status: 'ongoing',
    },
  },
  {
    matrix: [
      ['O', 'X', 'X'],
      ['X', 'O', 'O'],
      ['X', 'O', 'X'],
    ],
    description: 'a draw matrix',
    expectedState: {
      winner: null,
      coordinates: null,
      status: 'finished',
    },
  },
  {
    matrix: [
      ['O', 'X', 'X'],
      ['O', 'X', 'O'],
      ['X', 'O', 'X'],
    ],
    description: 'a X victory matrix',
    expectedState: {
      winner: 'X',
      coordinates: [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
      status: 'finished',
    },
  },
  {
    matrix: [
      ['O', 'X', 'X'],
      ['O', 'O', 'X'],
      ['X', 'X', 'O'],
    ],
    description: 'a O victory matrix',
    expectedState: {
      winner: 'O',
      coordinates: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      status: 'finished',
    },
  },
  {
    matrix: [
      ['X', 'X', 'X'],
      ['O', 'O', 'X'],
      ['O', 'X', 'O'],
    ],
    description: 'a line victory matrix',
    expectedState: {
      winner: 'X',
      coordinates: [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      status: 'finished',
    },
  },
  {
    matrix: [
      ['X', 'O', 'X'],
      ['O', 'O', 'X'],
      ['O', 'X', 'X'],
    ],
    description: 'a column victory matrix',
    expectedState: {
      winner: 'X',
      coordinates: [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      status: 'finished',
    },
  },
];

const generateTestTable = (matrix: string[][]) => {
  const table = new CliTable();
  table.push(...matrix);
  return table;
};

describe('The state of the game should be properly updated depending on the table', () => {
  gameStates.forEach((fixture) => {
    test(`It should return the appropriate object when sent ${fixture.description}`, () => {
      const table = generateTestTable(fixture.matrix);
      const gameState = getStateOfGame(table);
      expect(gameState).toStrictEqual(fixture.expectedState);
    });
  });
});
