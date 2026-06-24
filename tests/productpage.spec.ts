//Product :
import { test, expect } from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';

test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
});

//Data Provider
const productData = CsvHelper.readCsv('src/data/product.csv');

test('company logo exists on product page', async ({ basePage }) => {//passed
    expect(await basePage.isLogoVisible()).toBeTruthy();
});

test('footers exist on product page', async ({ basePage }) => {//passed
    expect(await basePage.getPageFootersCount()).toBe(16);
});

test('To check the product images count', async ({homePage, searchResultPage , productInfopage})=>{
        await homePage.doSearch('macbook'); //FAILED
        await searchResultPage.selectProduct('Macbook Pro');
        let imgcount = await productInfopage.getProductImagesCount();
        console.log('total images : ', imgcount);
        expect(imgcount).toBe(4);
    });

test('verify product Information/Data', async ({ homePage, searchResultPage, productInfopage }) => {
    await homePage.doSearch('macbook');
    await searchResultPage.selectProduct('MacBook Pro');
    let actualProductInfoMap = await productInfopage.getproductinfo();
    console.log('Actual Product Details: ', actualProductInfoMap);
    expect.soft(actualProductInfoMap.get('ProductHeader')).toBe('MacBook Pro');
    expect.soft(actualProductInfoMap.get('Brand')).toBe('Apple');
    expect.soft(actualProductInfoMap.get('Product Code')).toBe('Product 18'); 
    expect.soft(actualProductInfoMap.get('Reward Points')).toBe('800');
    expect.soft(actualProductInfoMap.get('ProductPrice')).toBe('$2,000.00');
    expect.soft(actualProductInfoMap.get('ExTaxPrice')).toBe('$2,000.00');
});
