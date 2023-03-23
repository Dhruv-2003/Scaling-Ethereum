Project will have 2 sets of Contracts

1. Client Side Oracle Contract
   -- Contracts deployed by a chain user on a new chain , to enable the Oracle service
   -- This will be a kind of Router , which then the oracle users can call to get the data
   -- It will define functions , for different type of Oracles , Like Chainlink and UMA

-> A Price Oracle Contract : Contract that stores the Data

2. Chain Side Oracle Contract
   -- Oracle contract on the optimism Chain , or Other Chain , where the Chainlinka and UMA are active.
   -- These functions will be called by another Server Side node , to get the Data on the other chain
   -- this Will actuallty functions from Chainlink and UMA oracles , from , where the Data will be stored back into the Contract

## Optimistic Oracle V2

-> Create a Request in the OOV2
-> Store the request , emit events
-> Oracle Node tracks the request on the chain from the event
-> Gets the info from the event , add the request to the OOConsumerV2
-> It is then sent to the Optimistic UMA Oracles
-> Then we wait for a proposer and disputor
-> When it is done, the call Settle Request , and the oracle will note the event to call it back from the consumer
-> In the same go , after 0.5 sec , oracles call the function to get the final result from the Consumer

the request Id is same across consumer and Oracle

## Optimistic Oracle V3

-> Assert a truth in the OOV3
-> Store the request , emit the events
-> Oracle Node tracks the assert event
-> gets the info and add the request to OOConsumerV3
-> Then automatically creates one in Optimistic UMA oracle
-> the assertion Id is returned as an event , which then needs to be stored in OOV3 again
-> then later , user calls settleAssert , emits event
-> Oracle tracks and call from OOConsumerV3 to settle and get the Result
-> then result is stored back in the OOV3 and this completed the requests

assertId and assertionId are different
