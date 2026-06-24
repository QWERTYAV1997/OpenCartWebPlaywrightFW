//ajv - popular node library for schema validation
//npm install ajv 

import { test, expect } from '../../src/fixtures/apifixtures';
import Ajv, { _ } from 'ajv';

let TOKEN = process.env.API_TOKEN;
let AUTH_HEADER = {Authorization : `Bearer ${TOKEN}`};

//Setup the AJV
let ajv = new Ajv();

//Define JSON schema:
let userSchema = {
  "type": "object",
  "properties": {
    "id": {
      "type": "number"
    },
    "name": {
      "type": "string"
    },
    "email": {
      "type": "string"
    },
    "gender": {
      "type": "string"
    },
    "status": {
      "type": "string"
    }
  },
  "required": [
    "id",
    "name",
    "email",
    "gender",
    "status"
  ]
};

let userArraySchema =  {
    "type": "array",
    "items": userSchema,
};

test('GET -- get a user', async ({apiHelper})=>{

        let userData = {
            name  : 'schema test',
            email: `automation_${Date.now()}@open.com`,
            gender: 'male',
            status: 'inactive'
        };


    //post -- create a user
    let creatResponse = apiHelper.post("/public/v2/users",userData , AUTH_HEADER);
    let userid = (await creatResponse).body.id;

    //get -- get a user
    let getUserresponse = await apiHelper.get(`/public/v2/users/${userid}`,AUTH_HEADER);
    expect(getUserresponse.status).toBe(200);

    //schema validation code 
    let validate = ajv.compile(userSchema);
    let isSchemaValid = validate(getUserresponse.body);

    if(!isSchemaValid){
        console.log("schema error : ", validate.errors);
    }

    expect(isSchemaValid).toBeTruthy();
});

test('GET -- get all user', async ({apiHelper})=>{

    //get -- get a user
    let getUsersresponse = await apiHelper.get(`/public/v2/users`,AUTH_HEADER);
    expect(getUsersresponse.status).toBe(200);

    //schema validation code 
    let validate = ajv.compile(userArraySchema);
    let isSchemaValid = validate(getUsersresponse.body);

    if(!isSchemaValid){
        console.log("schema error :", validate.errors);
    }

    expect(isSchemaValid).toBeTruthy();
});