# Tests de contrats avec une APIGATEWAY

A utiliser dans votre workflow

```     
- name: Setup Node
  uses: actions/setup-node@v3
  with:
    node-version: ${{ env.NODE_VERSION }}
    
- name: "Node"
  run: |
    npm ci
    npm install
  shell: bash
      
- name: "Get json"
  id: json
  run: |
    echo "::set-output name=INREQUEST::$(jq -c . pact/inRequest.json)"
    echo "::set-output name=INRESPONSE::$(jq -c . pact/inResponse.json)"
  shell: bash 
  
- name: "Run pacts check"
  uses: TheoTonneau/apicontract@v2.1
  with:
    apiUrl: "https://url-de-votre-api.com"
    apiToken: ${{ secrets.TOKEN-DE-VOTRE-API }}
    jsonIn: '${{ steps.json.outputs.INREQUEST }}'
    jsonOut: '${{ steps.json.outputs.INRESPONSE }}'
```

⚠️ L'ordre des variables dans le json de sortie peut-être différent de celui d'entrée

[Documentation sur les tests de contrats](https://pact.io/consumer)