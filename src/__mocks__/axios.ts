import axios from 'axios';

type Axios = typeof axios;

const mockAxios = jest.genMockFromModule<Axios>('axios');
mockAxios.create = jest.fn(() => mockAxios);

export default mockAxios;
