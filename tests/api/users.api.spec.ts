import { test , expect } from "@playwright/test";

let AUTH_TOKEN = { Authorization : 'Bearer ea1ca7e32c941b93d6d010186d3cbc1daae3c597ba3983c5cc77cb366468733c'};

test ('get user test data' , async ({request}) =>{
    let response = await request.get('https://gorest.co.in/public/v2/users/', {
        headers : AUTH_TOKEN
    });

    console.log(response);

    let jsonbody = await response.json();
    console.log(jsonbody);
    console.log(response.status());
    console.log(response.statusText());
    expect(response.status()).toBe(200);
});

//46:47

test ('create a user test data' , async ({request}) =>{

    //JS Object
    let userdata = {
        name: 'Geetad01',
        email: `automation_${Date.now()}@open.com`,
        gender: 'female',
        status: 'active'
    };

    //JS Object to JSON : Serialization
    let response = await request.post('https://gorest.co.in/public/v2/users', {
        headers : AUTH_TOKEN,
        data : userdata
    });

    console.log(response);

    let jsonbody = await response.json();
    console.log(jsonbody);
    console.log(response.status());
    console.log(response.statusText());
});

test ('update a user test data' , async ({request}) =>{

    //JS Object
    let userdata = {
        "name": "Geeta101111",
        "email": `automation_${Date.now()}@open.com`,
        "gender": "female",
        "status": "inactive"
    };

    //JS Object to JSON : Serialization
    let response = await request.put('https://gorest.co.in/public/v2/users/8509824', {
        headers : AUTH_TOKEN,
        data : userdata
    });

    console.log(response);

    let jsonbody = await response.json();
    console.log(jsonbody);
    console.log(response.status());
    console.log(response.statusText());
});

test ('delete a user test data' , async ({request}) =>{

    //JS Object to JSON : Serialization
    let response = await request.put('https://gorest.co.in/public/v2/users/8509824', {
        headers : AUTH_TOKEN,
    });

    console.log(response.status());
    console.log(response.statusText());
});