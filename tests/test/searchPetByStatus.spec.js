const {test, expect} = require('@playwright/test');
const newPetAPI = require('../api/newPetAPI');

test.describe('Search Pet by Status', () => {
let data = null;
let petData = null;
let query = null;

test('search available pets: @regression', async({request}) => {
    query = 'available';
await newPetAPI.petStatusViaGet(request,query);
})

test('search pending pets: @regression', async({request}) => {
    query = 'pending';
await newPetAPI.petStatusViaGet(request,query);
})

test('search sold pets: @regression', async({request}) => {
    query = 'sold';
await newPetAPI.petStatusViaGet(request,query);
})
})
