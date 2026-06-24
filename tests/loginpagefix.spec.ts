
import { test, expect } from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';
import { ExcelHelper } from '../src/utils/ExcelHelper';
import { JsonHelper } from '../src/utils/JSONHelper';

test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
});

test('login page title test', async ({ loginPage }) => { //PASSED
    const pageTitle = await loginPage.getPageTitle();
    console.log('login page title', pageTitle);
    expect(pageTitle).toBe('Account Login');
});

test('forgot pwd link exist test', async ({ loginPage }) => { //PASSED
    expect(await loginPage.isForgotPwdLinkExist()).toBeTruthy();
});

test('user is able to login to app test', async ({ loginPage, homePage }) => {//FAILED
    await loginPage.doLogin(process.env.appusername!, process.env.apppassword!);
    expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();
    expect.soft(await homePage.getPageTitle()).toBe('Account Login');
});


//DD_1. sequence mode -- only 1 test is running with test data one by one using testData from fixture
test('login to app using wrong credentials with Data driven test', async ({ loginPage, testData }) => {
    for (let row of testData) {//PASSED
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    }
});

//DD_2: without fixtures, parallel mode. read csv data directly and loop the test method row wise...
let testData = CsvHelper.readCsv('src/data/loginData.csv');
for (let row of testData) {//PASSED
    test(`invalid login test with - ${row.username} - ${row.password}`, async ({ loginPage }) => {
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    });
};

//MS excel - office latest
//xlsx format
//maintenance
let loginTestData = ExcelHelper.readExcel('src/data/openCartData.xlsx', 'login');
for (let row of loginTestData) { //NOT RUNNING - ISSUE IN EXCEL FILE STATE
    test(`invalid login test with excel data - ${row.username}`, async ({ loginPage }) => {
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    });
};

//
let loginJSONData = JsonHelper.readJson("src/data/loginData.json");
for (let row of loginJSONData) {//PASSED
    test(`invalid login test with JSON data - ${row.username}`, async ({ loginPage }) => {
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    });
};