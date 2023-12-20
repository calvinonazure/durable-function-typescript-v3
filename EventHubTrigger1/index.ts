import { AzureFunction, Context } from "@azure/functions"
import * as df from 'durable-functions';


const eventHubTrigger: AzureFunction = async function (context: Context, eventHubMessages: any[]): Promise<void> {
    context.log(`Eventhub trigger function called for message array ${eventHubMessages}`);
    const client = df.getClient(context);

    for (const message of eventHubMessages) {
        context.log(`Processed message ${message}`);

        //Invoke Durable Function 
        const body = JSON.stringify(message);
        
        const client = df.getClient(context);
        const instanceId = await client.startNew("DurableFunctionsOrchestratorJS1", undefined, body);
    
        context.log(`Started orchestration with ID = '${instanceId}'.`);
    
        //return client.createCheckStatusResponse(context.bindingData.req, instanceId);

    }
};

export default eventHubTrigger;
