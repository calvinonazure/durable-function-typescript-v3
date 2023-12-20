# durable-function-typescript-v3

- Following document https://learn.microsoft.com/en-us/azure/azure-functions/create-first-function-vs-code-typescript?pivots=nodejs-model-v3 and create template

## Test Location

- http://localhost:7071/api/orchestrators/DurableFunctionsOrchestratorJS1
- Connect to your Event Hub and send message to event hub

## local.settings.json content should like following

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "DefaultEndpointsProtocol=https;AccountName=mystorage0322;AccountKey=***********;EndpointSuffix=core.windows.net",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "AzureWebJobsFeatureFlags": "EnableWorkerIndexing",
    "myeh0616_RootManageSharedAccessKey_EVENTHUB": "Endpoint=sb://myeh0616.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=*******;EntityPath=samples-workitems"
  }
}
```

## Configure EventHubTrigger1 as orchestrationClient
Need add a type "orchestrationClient" section, so the eventhub could trigger Orchestrator of durable function
```json
{
  "bindings": [
    {
      "type": "eventHubTrigger",
      "name": "eventHubMessages",
      "direction": "in",
      "eventHubName": "samples-workitems",
      "connection": "myeh0616_RootManageSharedAccessKey_EVENTHUB",
      "cardinality": "many",
      "consumerGroup": "$Default",
      "dataType": "string"
    },
    {
      "name": "ehstarter",
      "type": "orchestrationClient",
      "direction": "in"
  }
  ],
  "scriptFile": "../dist/EventHubTrigger1/index.js"
}

```