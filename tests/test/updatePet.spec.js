const {test, expect} = require('@playwright/test');
const newPetAPI = require('../api/newPetAPI');

test.describe('Update Pet', () => {

test('Update Pet: @regression', async({request}) => {  
await newPetAPI.updatePetviaPut(request);
})
})
