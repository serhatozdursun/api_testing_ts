import axios, {AxiosResponse} from 'axios';
import dotenv from 'dotenv';
import Ajv2019 from 'ajv/dist/2019';
import path from 'path';
import fs from 'fs';
import {generateRandomPetPayload} from "../helper/helperMethod";
import {Pet} from "../helper/pet";

dotenv.config();

const ajv = new Ajv2019();
const BASE_URL = process.env.BASE_URL;
const ENDPOINT = '/v2/pet';
let pet: Pet;

describe('Create A Pet', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create a pet with the provided data', async () => {
        const headers = {
            'Content-Type': 'application/json'
        };

        const petPayload =  generateRandomPetPayload();
        const response: AxiosResponse = await axios.post(`${BASE_URL}${ENDPOINT}`, JSON.stringify(petPayload), {headers});

        expect(response.status).toBe(200);

        const schemaPath = path.join(__dirname, '..', '..', 'schemas', 'postPetSchema.json');
        const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));
        const validate = ajv.compile(schema);
        const isValid = validate(response.data);
        if (!isValid) {
            console.error('Validation errors:', validate.errors);
        }
        expect(isValid).toBe(true);
        expect(response.data).toEqual(petPayload);
        pet = response.data;
    });
});

export { pet };
