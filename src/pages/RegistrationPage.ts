import { Locator , Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class RegPage extends BasePage {

    //private Locators: 
    private readonly Firstname: Locator;
    private readonly lastname: Locator;
    private readonly EmailID: Locator;
    private readonly Telephone: Locator;
    private readonly Pwd: Locator;

    //const... of the class: init the locators
    constructor(page: Page) {
        super(page);
        this.Firstname = page.getByRole('textbox', { name: 'First Name' });
        this.lastname = page.getByRole('textbox', { name: 'Last Name' });
        this.EmailID = page.getByRole('textbox', { name: 'E-Mail' });
        this.Telephone = page.getByRole('textbox', { name: 'Telephone' });
        this.Pwd = page.getByRole('textbox', { name: 'Password' });

    };

    //public page actions(methods)/behaviour
    async goToRegPage(): Promise<void> {
        await this.page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');
    }

    async getRegPageTitle(): Promise<string> {
        return await this.page.title();
    }

    async doRegister(Firstname:string , lastname:string , EmailID:string , Telephone:string , Pwd:string): Promise<void> {
        console.log(`user creds: ${Firstname} : ${lastname} : ${EmailID} : ${Telephone} : ${Pwd} `);
        await this.Firstname.fill(Firstname);
        await this.lastname.fill(lastname);
        await this.EmailID.fill(EmailID);
        await this.Telephone.fill(Telephone);
        await this.Pwd.fill(Pwd);

    }
}


