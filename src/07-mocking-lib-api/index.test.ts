// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const mockAxiosCreate = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi('https://jsonplaceholder.typicode.com/posts');
    expect(mockAxiosCreate).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockAxiosClient = axios.create();
    const mockAxiosGet = jest.spyOn(mockAxiosClient, 'get');
    jest.spyOn(axios, 'create').mockReturnValue(mockAxiosClient);
    await throttledGetDataFromApi('/posts');
    expect(mockAxiosGet).toHaveBeenCalledWith('/posts');
  });

  test('should return response data', async () => {
    const mockData = [{ id: 1, title: 'Post 1' }];
    const mockResponse = { data: mockData };
    const mockAxiosClient = axios.create();
    jest.spyOn(mockAxiosClient, 'get').mockResolvedValue(mockResponse);
    jest.spyOn(axios, 'create').mockReturnValue(mockAxiosClient);
    const result = await throttledGetDataFromApi('/posts');
    expect(result).toEqual(mockData);
  });
});
