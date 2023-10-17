const {test, expect} = require('@playwright/test');
const newPetAPI = require('../api/newPetAPI');

test.describe('Search pet by ID', () => {
let data = null;
let petData = null;
let petID = null;

test('search pet via id: @regression', async({request}) => {
//search Pet via ID 
petData = await newPetAPI.createNewPet(data); 
petID = await newPetAPI.createPetViaPost(request, petData);  
await newPetAPI.petIdViaGet(request,petID);
})

})
