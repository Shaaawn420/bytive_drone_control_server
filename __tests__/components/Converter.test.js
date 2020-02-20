const faker = require('faker');
const Converter = require('../../src/components/Converter');

describe('Converter Test', () => {
  /**
   * {Converter}
   */
  let converter;

  /**
   *
   * @type {{stop: string, left: string, start: string, right: string}}
   */
  const types = {
    left: 'L',
    right: 'R',
    start: 'S',
    stop: 'C',
  };

  /**
   *
   * @type {{MIN: number, MAX: number}}
   */
  const serverValues = {
    MIN: 1150,
    MAX: 2000,
  };

  /**
   *
   * @type {{MIN: number, MAX: number}}
   */
  const clientValues = {
    MIN: -1,
    MAX: 1,
  };

  /**
   * Setup method which runs once.
   */
  beforeAll(() => {
    converter = new Converter();
  });

  test('Returns expected results', () => {
    const values = {
      left: {x: faker.finance.amount(-1, 1), y: faker.finance.amount(-1, 1)},
      right: {x: faker.finance.amount(-1, 1), y: faker.finance.amount(-1, 1)},
    };

    const expected = {
      left: `${types.left}|${getCorrectValue(values.left.x)}|${getCorrectValue(
          values.left.y)}`,
      right: `${types.right}|${getCorrectValue(
          values.right.x)}|${getCorrectValue(
          values.right.y)}`,
      start: `${types.start}`,
      stop: `${types.stop}`,
    };

    expect(converter.buildResponse('left', values.left.x, values.left.y)).
        toBe(expected.left);
    expect(converter.buildResponse('right', values.right.x, values.right.y)).
        toBe(expected.right);
    expect(converter.buildResponse('start')).
        toBe(expected.start);
    expect(converter.buildResponse('stop')).
        toBe(expected.stop);
  });

  /**
   *
   * @returns {{x: *, y: *, type: *}}
   */
  const getFakeData = () => ({
    x: faker.finance.amount(-1, 1),
    y: faker.finance.amount(-1, 1),
    type: faker.random.arrayElement(['left', 'right', 'start', 'stop']),
  });

  /**
   *
   * @param value
   * @returns {number}
   */
  const getCorrectValue = (value) => Number(((value - clientValues.MIN) *
      (serverValues.MAX - serverValues.MIN) /
      (clientValues.MAX - clientValues.MIN) + serverValues.MIN).toFixed(0));
});