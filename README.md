# Tests de contrats avec une APIGATEWAY

A utiliser dans votre workflow

```      
- name: "Run pacts check"
  uses: TheoTonneau/apicontract@v1.1.3
  with:
    apiUrl: "https://url-de-votre-api.com"
    apiToken: ${{ secrets.TOKEN-DE-VOTRE-API }}
    jsonIn: '${cat pact/Request.json}'
    jsonOut: '${cat pact/ExpectedResponse.json}' 
```

[Documentation sur les tests de contrats](https://pact.io/consumer)