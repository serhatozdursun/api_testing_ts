import axios, {AxiosResponse} from 'axios';
import dotenv from 'dotenv';
import Ajv2019 from 'ajv/dist/2019';
import path from 'path';
import fs from 'fs';
import {updatePetPayload} from "../helper/helperMethod";
import {pet} from "./01_postPet.test";

dotenv.config();

const ajv = new Ajv2019();
const BASE_URL = process.env.BASE_URL;
const ENDPOINT = '/v2/pet';

describe('Update A Pet', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should update a pet with the provided data', async () => {
        const headers = {
            'Content-Type': 'application/json'
        };
        const updatedPetPayload = updatePetPayload(pet);
        const response: AxiosResponse = await axios.post(`${BASE_URL}${ENDPOINT}`, JSON.stringify(updatedPetPayload), {headers});


        expect(response.status).toBe(200);

        const schemaPath = path.join(__dirname, '..', '..', 'schemas', 'putPetSchema.json');
        const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));
        const validate = ajv.compile(schema);
        const isValid = validate(response.data);
        if (!isValid) {
            console.error('Validation errors:', validate.errors);
        }
        expect(isValid).toBe(true);
        expect(response.data).toEqual(updatedPetPayload);
    });
});

