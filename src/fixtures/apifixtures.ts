import { test as basetest, expect } from '@playwright/test';
import { APiHelper } from '../api/APIHelper';

//define the type of API fixtures :
type Apifixtures = {
        apiHelper : APiHelper;
}

export let test =  basetest.extend<Apifixtures>({
        apiHelper : async ({ request }, use) => {
        let apiHelper = new APiHelper(
            request,
            process.env.API_BASE_URL!  //!->Provided null check 
        );
        await use(apiHelper);
    },
})

export { expect } from '@playwright/test';
