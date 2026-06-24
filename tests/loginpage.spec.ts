
import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { HomePage } from '../src/pages/HomePage';

let loginPage : LoginPage;
let homePage : HomePage;

test.beforeEach(async ({ page }) =>{
    loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    homePage = new HomePage(page);  //Object created otherwise homepage points to null refrence
});

test('login page title test', async ({  }) => {//PASSED
    const pageTitle = await loginPage.getLoginPageTitle();
    console.log('login page title', pageTitle);
    expect(pageTitle).toBe('Account Login');
});

test('forgot pwd link exist test', async ({ }) => {//PASSED
    expect(await loginPage.isForgotPwdLinkExist()).toBeTruthy();
});

test('User is able to login to app test', async ({ }) => {//PASSED
    await loginPage.doLogin('pwtestbatch@open.com','pw123');
    expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();
    expect.soft(await homePage.getPageTitle()).toBe('My Account');
});




