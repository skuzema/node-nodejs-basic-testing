// Uncomment the code below and write your tests
// import axios, { AxiosInstance, AxiosResponse } from 'axios';
// import { throttledGetDataFromApi } from './index';

// jest.mock('axios');
// describe('throttledGetDataFromApi', () => {
//   test('should create instance with provided base url', async () => {
//     const axiosInstanceMock = {
//       get: jest.fn(),
//       defaults: {},
//       interceptors: {},
//       getUri: jest.fn(),
//       request: jest.fn(),
//       // Include other necessary properties/methods here
//     } as unknown as AxiosInstance;

//     jest.spyOn(axios, 'create').mockReturnValue(axiosInstanceMock);

//     const responseData = 'mocked data';
//     const response: AxiosResponse = {
//       data: responseData,
//       status: 200,
//       statusText: 'OK',
//       headers: {}, // Empty headers object
//       config: {},
//     };

//     axios.get.mockResolvedValueOnce(response);

//     const result = await throttledGetDataFromApi('/posts');

//     expect(axios.create).toHaveBeenCalledWith({
//       baseURL: 'https://jsonplaceholder.typicode.com',
//     });

//     expect(result).toEqual(responseData);
//   });

//   test('should perform request to correct provided url', async () => {
//     const axiosClient = axios.create();
//     const getSpy = jest
//       .spyOn(axiosClient, 'get')
//       .mockResolvedValueOnce({ data: 'test data' });

//     const axiosCreateSpy = jest
//       .spyOn(axios, 'create')
//       .mockReturnValueOnce(axiosClient);

//     const result = await throttledGetDataFromApi('/posts');

//     expect(axiosCreateSpy).toHaveBeenCalledWith({
//       baseURL: 'https://jsonplaceholder.typicode.com',
//     });
//     expect(getSpy).toHaveBeenCalledWith('/posts');
//     expect(result).toEqual('test data');
//   });

//   test('should return response data', async () => {
//     const axiosClient = axios.create();
//     const getSpy = jest
//       .spyOn(axiosClient, 'get')
//       .mockResolvedValueOnce({ data: 'response data' });

//     const axiosCreateSpy = jest
//       .spyOn(axios, 'create')
//       .mockReturnValueOnce(axiosClient);

//     const result = await throttledGetDataFromApi('/posts');

//     expect(axiosCreateSpy).toHaveBeenCalledWith({
//       baseURL: 'https://jsonplaceholder.typicode.com',
//     });
//     expect(getSpy).toHaveBeenCalledWith('/posts');
//     expect(result).toEqual('response data');
//   });
// });
