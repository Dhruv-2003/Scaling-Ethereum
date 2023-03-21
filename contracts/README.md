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
