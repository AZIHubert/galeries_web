import axios from 'axios';

type Axios = jest.Mocked<typeof axios>;

const mockAxios = jest.genMockFromModule<Axios>('axios');
mockAxios.create = jest.fn(() => mockAxios);

export default mockAxios;
