// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from './index';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 200;
    const account = getBankAccount(initialBalance);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(100);
    expect(() => account.withdraw(200)).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const account1 = getBankAccount(200);
    const account2 = getBankAccount(50);
    expect(() => account1.transfer(250, account2)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(100);
    expect(() => account.transfer(50, account)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const initialBalance = 250;
    const account = getBankAccount(initialBalance);
    const amount = 50;
    account.deposit(amount);
    expect(account.getBalance()).toBe(initialBalance + amount);
  });

  test('should withdraw money', () => {
    const initialBalance = 250;
    const account = getBankAccount(initialBalance);
    const amount = 50;
    account.withdraw(amount);
    expect(account.getBalance()).toBe(initialBalance - amount);
  });

  test('should transfer money', () => {
    const initialBalance1 = 250;
    const initialBalance2 = 300;
    const account1 = getBankAccount(initialBalance1);
    const account2 = getBankAccount(initialBalance2);
    const amount = 50;
    account1.transfer(amount, account2);
    expect(account1.getBalance()).toBe(initialBalance1 - amount);
    expect(account2.getBalance()).toBe(initialBalance2 + amount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(100);
    const balance = await account.fetchBalance();
    if (balance !== null) {
      expect(typeof balance).toBe('number');
    } else {
      expect(typeof balance).toBeNull;
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(100);
    const synchronizeBalancePromise = account.synchronizeBalance();
    await expect(synchronizeBalancePromise).rejects.toThrowError(
      SynchronizationFailedError,
    );
    expect(account.getBalance()).toBeGreaterThan(0);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(100);
    const synchronizeBalancePromise = account.synchronizeBalance();
    await expect(synchronizeBalancePromise).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
