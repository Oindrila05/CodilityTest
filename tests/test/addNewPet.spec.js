const {test, expect} = require('@playwright/test');
const newPetAPI = require('../api/newPetAPI');

test.describe('create new Pet', () => {
let data = null;
let petData = null;

test('create new Pet: @regression', async({request}) => {
//created a newPetApi.js file to create data and get response. 
petData = await newPetAPI.createNewPet(data); 
await newPetAPI.createPetViaPost(request, petData);
})
})
