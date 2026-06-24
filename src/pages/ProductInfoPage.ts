//
import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductInfoPage extends BasePage {

    //private Locators: 
    private readonly productheader: Locator;
    private readonly productimages: Locator;
    private readonly productMetadata: Locator;
    private readonly productpricing: Locator;
    private map : Map<string,string|number>;

    //const... of the class: init the locators
    constructor(page: Page) {
        super(page);
        this.productheader = page.getByRole('heading', {level: 1});
        this.productimages = page.locator('div#content li img');
        this.productMetadata = page.locator('div#content ul.list-unstyled:nth-of-type(1)');
        this.productpricing = page.locator('div#content ul.list-unstyled:nth-of-type(2)');
        this.map = new Map<string,string|number>();
    };

    //actions
    async getproductheader():Promise<string>{
        await this.page.waitForTimeout(4000);
        return await this.productheader.innerText();
    }

    async getProductImagesCount():Promise<number>{
        return await this.productimages.count();
    }

    /**
     * 
     * @returns this method is actually returning product data : header , images , metadata, pricing
     */

    async getproductinfo():Promise<Map<string,string|number>> {
        this.map.set('Product Header', await this.getproductheader());
        this.map.set('Product Images', await this.getProductImagesCount());
        await this.getproductMetadata();
        await this.getproductpricingdata();
        return this.map;
    }

    //brand apple
    //product code
    //reward points
    //availability
    private async getproductMetadata() : Promise<void>{
        let productmetadata = await this.productMetadata.allInnerTexts();
        for (let data of productmetadata){
            let meta = data.split(':');
            let metakey = meta[0].trim();
            let metaval = meta[1].trim();
            this.map.set(metakey,metaval);

        }
    }
    //$2000
    //Ex. tax 
    private     async getproductpricingdata() : Promise<void>{
        let pricedata = await this.productpricing.allInnerTexts();
        let Productprice = pricedata[0].trim();
        let xtraprice = pricedata[1].split(':')[1].trim();
        this.map.set('Product price is : ' , Productprice);
        this.map.set('External taxpRICE : ' , xtraprice);
    }

}