const { test, expect } = require('@playwright/test');
const newPetAPI = require('../api/newPetAPI');

test.describe('Delete a Pet', () => {
    let data = null;
    let petData = null;
    let petID = null;

    test('Delete a pet: @regression', async ({ request }) => {

        petData = await newPetAPI.createNewPet(data);
        petID = await newPetAPI.createPetViaPost(request, petData);
        await newPetAPI.removePetViaDelete(request, petID);
        await newPetAPI.deletedPetIDViaGet(request, petID);
    })

})