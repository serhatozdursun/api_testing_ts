import { Pet } from "./pet";
import { faker } from '@faker-js/faker/locale/en';

const generateRandomTag = (): { id: number; name: string } => {
    return {
        id: faker.number.int({ min: 1000000000, max: 9999999999 }),
        name: faker.lorem.word()
    };
};

const generateRandomPhotoUrl = (): string => {
    return faker.internet.url();
};

export const generateRandomPetPayload = (): Pet => {
    return {
        id: faker.number.int(),
        category: {
            id: faker.number.int(),
            name: faker.lorem.word()
        },
        name: faker.animal.dog(),
        photoUrls: [generateRandomPhotoUrl()],
        tags: [generateRandomTag()],
        status: faker.helpers.arrayElement(['available', 'pending', 'sold'])
    };
};

export const updatePetPayload = (pet: Pet): Pet => {
    pet.name = faker.animal.dog();
    pet.tags = [{
        id: pet.tags[0].id,
        name: pet.tags[0].name
    }, {
        id: faker.number.int({ min: 1000000000, max: 9999999999 }),
        name: faker.lorem.word()
    }];
    pet.photoUrls = [pet.photoUrls[0], generateRandomPhotoUrl()];
    pet.status = faker.helpers.arrayElement(['available', 'pending', 'sold']);
    return pet;
};
