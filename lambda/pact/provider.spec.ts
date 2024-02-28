// Important librairies
import { Verifier } from "@pact-foundation/pact";
import path from "path";

// Call method from another file

// get token from env
const token = process.env.API_TOKEN;
const api_URL = process.env.API_URL;


// Get path
const pactUrls = [path.resolve("pact/pacts")];

// Describe the pact test
describe("VALIDATE PACTS", () => {

    // We test the contract
    it(`Should validate API ${api_URL}`, async () => {

        // Construct the verifier
        return new Verifier ({
            providerBaseUrl: `${api_URL}`,
            provider: "provider",
            pactUrls,
            requestFilter: (req, res, next) => {
                req.headers['x-api-key'] = `${token}`;
                next();
            }
        }).verifyProvider();
    });
});