// Uncomment the code below and write your tests
import {
  readFileAsynchronously,
  doStuffByTimeout,
  doStuffByInterval,
} from './index';
import path, { join } from 'path';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

jest.mock('fs', () => ({
  existsSync: jest.fn(),
  readFile: jest.fn(),
}));

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;
    const setTimeoutMock = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, timeout);
    expect(setTimeoutMock).toHaveBeenCalledWith(callback, timeout);
    jest.runAllTimers();
    expect(callback).toHaveBeenCalled();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;
    doStuffByTimeout(callback, timeout);
    expect(callback).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const interval = 1000;
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, interval);
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(callback, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 1000;
    const numIntervals = 3;
    doStuffByInterval(callback, interval);
    expect(callback).not.toHaveBeenCalled();
    for (let i = 0; i < numIntervals; i++) {
      jest.advanceTimersByTime(interval);
      expect(callback).toHaveBeenCalledTimes(i + 1);
    }
  });
});

jest.mock('fs/promises');

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const toFile = 'test.txt';
    const spyJoin = jest.spyOn(path, 'join');
    await readFileAsynchronously(toFile);
    expect(spyJoin).toHaveBeenCalledWith(__dirname, toFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'nonexistent.txt';
    (existsSync as jest.Mock).mockReturnValueOnce(false);
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = 'test.txt';
    const fullPath = join(__dirname, pathToFile);
    const mockFileContent = 'Mock file content';
    (existsSync as jest.Mock).mockReturnValueOnce(true);
    (readFile as jest.Mock).mockResolvedValueOnce(Buffer.from(mockFileContent));
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBe(mockFileContent);
    expect(existsSync).toHaveBeenCalledWith(fullPath);
    expect(readFile).toHaveBeenCalledWith(fullPath);
  });
});
