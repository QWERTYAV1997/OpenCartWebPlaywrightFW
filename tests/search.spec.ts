import { test, expect } from '../src/fixtures/pagefixtures';
import { HomePage } from '../src/pages/HomePage';
import { CsvHelper } from '../src/utils/CsvHelper';

test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
});

// test('verify search with product' , async ({homePage}) => {
//     await homePage.doSearch('macbook');
// });


//Data Provider
const productData = CsvHelper.readCsv('src/data/product.csv');

for (const row of productData) {
    test(`verify search results count - ${row.searchkey} - ${row.productname}`, async ({ homePage, searchResultPage}) => {
        await homePage.doSearch(row.searchkey);
        expect(await searchResultPage.getProductSearchResultsCount()).toBe(Number(row.resultcount));
    });
};

for (const row of productData) {
    test(`verify user is able to land on the product page - ${row.searchkey} - ${row.productname}`, async ({ homePage, searchResultPage, page }) => {
        await homePage.doSearch(row.searchkey);
        await searchResultPage.selectProduct(row.productname);
        expect(await page.title()).toBe(row.productname);
    });
};

//common tests:
test('comp logo exists on product page', async ({ basePage }) => {//passed
    expect(await basePage.isLogoVisible()).toBeTruthy();
});

test('footers exist on product page', async ({ basePage }) => {//passed
    expect(await basePage.getPageFootersCount()).toBe(16);
});
