import fetch from 'node-fetch';

// Function for making a POST request with Fetch
export async function postData(url: string, token: string, entry: any,): Promise<any> {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "x-api-key": `${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(entry),
        }).catch((error) => {
            throw new Error(`Error during POST request: ${error.message}`);
        });

        const data = await response.json();
        return { status: response.status, data };
    } catch (error) {
        if (error instanceof Error)
            throw new Error(`Error during POST request: ${error.message}`);
    }
}