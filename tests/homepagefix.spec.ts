import { expect } from '@playwright/test';
import { test } from '../src/fixtures/pagefixtures';

test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin('pwtestbatch@open.com', 'pw123');
});

test('home page title test', async ({ homePage }) => {//FAILED
    const pageTitle = homePage.getPageTitle();
    console.log('home page title', pageTitle);
    expect(pageTitle).toBe('My Account');
});

test('logout link exist test', async ({ homePage }) => { //PASSED
    expect(await homePage.isLogoutLinkExist()).toBeTruthy();
});

test('home page headers exist test', async ({ homePage }) => {
    let allHeaders = await homePage.getHomePageHeaders();//PASSED
    console.log('home page headers: ', allHeaders);
    expect.soft(allHeaders).toHaveLength(4);
    expect.soft(allHeaders).toEqual([
        'My Account',
        'My Orders',
        'My Affiliate Account',
        'Newsletter'
    ]);
});
