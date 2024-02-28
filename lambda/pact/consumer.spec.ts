// Important libraries
import { pactWith } from "jest-pact";
import { Matchers } from "@pact-foundation/pact";

// Call method from another file
import { postData } from "./post";

// get token from env
const token = process.env.API_TOKEN;
const api_URL = process.env.API_URL;
const json_In = process.env.JSON_IN;
const json_out = process.env.JSON_OUT;


function couperUrl(url: string): [string, string] {
    const urlRegex = /^(https?:\/\/[^\/]+)(\/.*)$/; // Regex pour capturer le lien et le chemin du répertoire
    const matches = url.match(urlRegex);
    if (matches && matches.length === 3) {
        const lien = matches[1];
        const cheminRepertoire = matches[2];
        return [lien, cheminRepertoire];
    } else {
        throw new Error("L'URL fournie n'est pas valide.");
    }
}
let urlApi:string;
let chemin:string;
try {
    const [lien, cheminRepertoire] = couperUrl(api_URL);
     urlApi = lien;
     chemin = cheminRepertoire;
} catch (error) {
    console.error("Erreur:", error.message);
}


// Data JSON
const inData            =  (json_In);
const dataINResponse    = (json_out);

// Output API value must be the same as those expected
const EXPECTED_BODY_IN  = Matchers.like(dataINResponse);


pactWith(

    // Define consumer & provider (the name of each is not important)
    {
        consumer: "consumer",
        provider: "provider",
    },

    // Define the contract
    (provider) => {

        // Create the url of the mock provider
        let url:any ;

        // Define the url
        beforeAll(() => {
            url = provider.mockService.baseUrl;
        });

        // We describe what is included in the contract
        describe(`POST ${urlApi}`, () => {

            // First for IN side
            it("should return an HTTP 200", async () => {

                // Create interaction
                await provider.addInteraction({

                    state: '',
                    uponReceiving: `POST ${urlApi}`,
                    withRequest: {
                        method: 'POST',

                        // End path of your API's url
                        path: `${chemin}`,
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(inData),
                    },
                    willRespondWith: {
                        status: 200,
                        headers: {'Content-Type': 'application/json'},
                        body: EXPECTED_BODY_IN.value,
                    },
                });

                // Send data
                await postData(`${url}${chemin}`, String(token), inData)
                    .then(reponse => {
                        expect(reponse.status).toEqual(200);
                        expect(reponse.data).toEqual(EXPECTED_BODY_IN.value);
                    })
                    .catch(error => {
                        console.error('Error:', error.message);
                    });
            });
        });
    },
);