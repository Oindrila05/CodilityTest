const { expect } = require('@playwright/test');
const random = require('randomstring');
const baseURL = 'https://petstore.swagger.io/v2/pet';

async function createNewPet(data) {
  try {
    const randomNumber = random.generate({ length: 5, charset: 'numeric' });
    const idRandom = `${randomNumber}`;
    let createPetData = {
      "id": `${idRandom}`,
      "category": {
        "id": `${idRandom}`,
        "name": `OinPetDog${idRandom}`
      },
      "name": `Oindoggie${idRandom}`,
      "photoUrls": [
        "string"
      ],
      "tags": [
        {
          "id": `${idRandom}`,
          "name": `tagname${idRandom}`
        }
      ],
      "status": "notavailable"

    }
    return createPetData;

  }
  catch (error) {
    throw error;
  }
}

async function createPetViaPost(request, data) {
  try {
    console.log('creating new pet in store via Post API')
    const response = await request.post(`${baseURL}`, { data });
    //assert the response and status
    expect(await response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const petID = (await response.json()).id;
    console.log(`New Pet created ${petID}`);
    //assert the test data
    expect(((await response.json()).category).name).toContain("OinPetDog");
    expect(((await response.json()).tags[0]).name).toContain("tagname");
    return petID;
  }
  catch (error) {
    throw error;
  }
}

async function petIdViaGet(request, petID) {
  try {
    const response = await request.get(`${baseURL}/${petID}`);
    //assert the response 
    expect(response.ok()).toBeTruthy();
    const petData = await response.json();
    const petName = petData.name;
    console.log(`Pet retrived with id = ${petID}, Pet name = ${petName}`);
    //assert the pet name
    expect(petName).toContain("Oindoggie");
    return petData;
  } catch (error) {
    throw error;
  }
}

async function petStatusViaGet(request, query) {
  try {
    console.log(`Search Pet with status = ${query}`);
    const response = await request.get(`${baseURL}/findByStatus?status=${query}`);
    //assert for get OK response
    expect(response.ok()).toBeTruthy();
    const petData = await response.json();
    return petData;
  } catch (error) {
    throw error;
  }
}

async function removePetViaDelete(request, petID) {
  try {
    console.log('deleting the pet created via delete')
    const deletePet = await request.delete(`${baseURL}/${petID}`, {
      data: {
        "code": 200,
        "type": "unknown",
        "message": "1"
      }
    })
    //assert for deleting Pet status 
    expect(deletePet.ok()).toBeTruthy()
    expect(deletePet.status()).toBe(200);
    return petID;
  }
  catch (error) {
    throw error;
  }

}

async function deletedPetIDViaGet(request, petID) {
  try {
    const response = await request.get(`${baseURL}/${petID}`);
    //assert for status to be 404
    expect(response.status()).toBe(404);
    console.log((await response.json()).message);
    //assert for pet not found message in the response
    expect((await response.json()).message).toBe("Pet not found");

  } catch (error) {
    throw error;
  }
}

async function updatePetviaPut(request) {
  try {
    console.log('creating new pet in store via Post API')
    const response = await request.put(`${baseURL}`, {
      data: {
        "id": 4,
        "category": {
          "id": 4,
          "name": "stringUpdate"
        },
        "name": "doggieUpdate",
        "photoUrls": [
          "string"
        ],
        "tags": [
          {
            "id": 0,
            "name": "string"
          }
        ],
        "status": "available"
      }
    });
    //assert the response and status
    expect(await response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const petID = (await response.json()).id;
    console.log(`Updated Pet ${petID}`);
    //assert the updated pet data
    expect(((await response.json()).category).name).toContain("stringUpdate");
    expect(((await response.json()).tags[0]).name).toContain(`string`);
    return petID;
  }
  catch (error) {
    throw error;
  }
}

module.exports = {
  createNewPet,
  createPetViaPost,
  petIdViaGet,
  petStatusViaGet,
  removePetViaDelete,
  deletedPetIDViaGet,
  updatePetviaPut
}
