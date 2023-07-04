// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 10, b: 5, action: Action.Subtract, expected: 5 },
  { a: 13, b: 3, action: Action.Subtract, expected: 10 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 1, b: 1, action: Action.Multiply, expected: 1 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 10, b: 1, action: Action.Divide, expected: 10 },
  { a: 5, b: 5, action: Action.Divide, expected: 1 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 1, b: 1, action: Action.Exponentiate, expected: 1 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
];

describe('simpleCalculator', () => {
  testCases.forEach(({ a, b, action, expected }) => {
    test(`should perform ${action} operation on ${a} and ${b}`, () => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    });
  });

  test('should return null for invalid action', () => {
    const input = { a: 5, b: 3, action: '+' };
    const result = simpleCalculator(input);
    expect(result).toThrowError;
  });

  test('should return null for invalid arguments', () => {
    const input = { a: '5', b: 3, action: Action.Add };
    const result = simpleCalculator(input);
    expect(result).toBeNull();
  });
});
