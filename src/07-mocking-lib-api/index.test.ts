// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const base_url = 'https://jsonplaceholder.typicode.com';
const url = '/user';
const mockData = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
  },
];

jest.mock('axios');
describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });
  test('should create instance with provided base url', async () => {
    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: mockData }),
    });
    await throttledGetDataFromApi(url);
    expect(axios.create).toHaveBeenCalledWith({ baseURL: base_url });
  });

  test('should perform request to correct provided url', async () => {
    const mockAxiosClient = {
      get: jest.fn().mockResolvedValue({ data: mockData }),
    };
    (axios.create as jest.Mock).mockReturnValue(mockAxiosClient);
    await throttledGetDataFromApi(url);
    jest.runAllTimers();
    expect(mockAxiosClient.get).toHaveBeenCalledWith(url);
  });

  test('should return response data', async () => {
    const mockResponse = { data: mockData };
    const mockAxiosClient = {
      get: jest.fn().mockResolvedValue(mockResponse),
    };
    (axios.create as jest.Mock).mockReturnValue(mockAxiosClient);
    const result = await throttledGetDataFromApi(url);
    expect(result).toEqual(mockData);
  });
});
