//
import { test as basetest, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CsvHelper } from '../utils/CsvHelper';
import { BasePage } from '../pages/BasePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { LoginPage } from '../pages/LoginPage';
import { ProductInfoPage } from '../pages/ProductInfoPage';

//define tyoe for Page Fixtures 
type pageFixtures = {
basePage :  BasePage,
loginPage:  LoginPage ; 
homePage :  HomePage ;
searchResultPage : SearchResultsPage;
productInfopage : ProductInfoPage;
testData :  Record<string, string>[];
};

//extend playwright base test : 
//extend playwright base test:

export let test = basetest.extend<pageFixtures>({
    basePage: async ({ page }, use) => {
        let basePage = new BasePage(page);
        await use(basePage);
    },

    loginPage: async ({ page }, use) => {
        let loginPage = new LoginPage(page);
        await use(loginPage);
    },

    homePage: async ({ page }, use) => {
        let homePage = new HomePage(page);
        await use(homePage);
    },

    searchResultPage: async ({ page }, use) => {
    let searchResultPage = new SearchResultsPage(page);
    await use(searchResultPage);
    },

    productInfopage: async ({ page }, use) => {
    let productInfopage = new ProductInfoPage(page);
    await use(productInfopage);
    },

    testData: async ({ }, use) => {
        let testData = CsvHelper.readCsv('src/data/loginData.csv');
        await use(testData);
    }

});

export { expect } from '@playwright/test';