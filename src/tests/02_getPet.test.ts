import axios, {AxiosResponse} from 'axios';
import {pet} from './01_postPet.test'; // Importing pet ID from the previous tests file

describe('Get Pet by ID', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should get pet details by ID', async () => {

        const headers = {
            'api_key': 'apiKey',
            'Content-Type': 'application/json'
        };
        const response: AxiosResponse = await axios.get(`https://petstore.swagger.io/v2/pet/${pet?.id}`,
            {headers});

        expect(response.status).toBe(200);
        expect(response.data).toEqual(pet);

    });
});
