import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { HomePage} from '../src/pages/HomePage';
import { RegPage } from '../src/pages/RegistrationPage';
import { SearchResultsPage } from '../src/pages/SearchResultsPage';

let loginPage : LoginPage;
let homePage : HomePage;
let regPage : RegPage;
let searchResultPage : SearchResultsPage;

test.beforeEach(async ({ page }) =>{
    loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    await loginPage.doLogin(' ','pw123');
    homePage = new HomePage(page);
});

test('Home Page title test', async ({ }) => { //PASSED
        const pageTitle = await loginPage.getLoginPageTitle();
        console.log('login page title', pageTitle);
        expect(pageTitle).toBe('Account Login');
});

test('Logout Link Exists', async ({ }) => { //FAILED
    expect(await homePage.isLogoutLinkExist()).toBeTruthy();
});

test('Home page header Exists', async ({ }) => { //FAILED
    let allHeaders  = await homePage.getHomePageHeaders();
    console.log('Home page headers are : ', allHeaders);
    expect.soft(allHeaders).toHaveLength(4);
    expect.soft(allHeaders).toEqual([
        'My Account',
        'My Orders',
        'My Affiliate Account',
        'Newsletter',
    ])
});



