import { get } from 'node:http';
import { APiHelper } from '../../src/api/APIHelper';
import { test, expect } from '../../src/fixtures/apifixtures';

const TOKEN = process.env.API_TOKEN!;
let AUTH_HEADER = { Authorization : `Bearer ${TOKEN}`,
};

//post -- get
//post -- update
//post -- get
//post -- delete
//helper - generic function - create a fresh user 

async function createuser(apiHelper : any){
        let userData = {
            name: 'GeetaBabita2020',
            email: `automation_${Date.now()}@open.com`,
            gender: 'male',
            status: 'inactive'
        };
    
        let response = await apiHelper.post('/public/v2/users', userData , AUTH_HEADER);
        expect(response.status).toBe(201);
        return response.body;

    }

    //Test--1  :  Create a user test + verify : AAA ----------------------------------------------------------
    //POST ---> userId --> GET /userId -- verify 
    test('POST -- CREATE A USER' , async({apiHelper}) => {

        //CREATE A USER 
        let userResponse= await createuser(apiHelper);

        //GET A USER 
        let Response= await apiHelper.get(`/public/v2/users${userResponse.ID}`, AUTH_HEADER);
        expect(Response.status).toBe(200);
        expect(Response.body.name).toBe("GeetaBabita2020");
    });

    //test- - 2 Update a user + verify : AAA ------------------------------------------------------------------
    //POST ---> userId --> PUT --> GET /userId -- verify
    test('PUT -- UPDATE A USER' , async({apiHelper}) => {

        //CREATE A USER :POST 
        let userResponse= await createuser(apiHelper);
        let userDataupdated = {
        name: 'GeeTaBabita2020 UPDATED',
        status: 'active'
    };

        //UPDATE A USER : 
        let getResponse= await apiHelper.put(`/public/v2/users${userResponse.ID}`,userDataupdated,  AUTH_HEADER);
        expect(getResponse.status).toBe(200);
        expect(getResponse.body.name).toBe(userDataupdated.name);
        expect(getResponse.body.status).toBe(userDataupdated.status);

        //GET A USER :
        let responses = await apiHelper.get(`/public/v2/users${userResponse.ID}`,  AUTH_HEADER);
        expect(responses.status).toBe(200);
        expect(responses.body.name).toBe(userDataupdated.name);
        expect(responses.body.status).toBe(userDataupdated.status);
    });

    //Test 3: Delete a user test + verify: AAA------------------------------------------------------------------
    //POST ---> userId --> DELETE(204) --> GET /userId -- verify(404)
    test('DELETE - delete a user', async ({ apiHelper }) => {
    //create a user: POST
    let userResponse = await createuser (apiHelper);

    //update the user:
    let response = await apiHelper.delete(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(response.status).toBe(204);

    //get the user:
    let getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(404);
    expect(getResponse.body.message).toBe('Resource not found');
});




