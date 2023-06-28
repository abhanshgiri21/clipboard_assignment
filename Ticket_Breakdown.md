# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

We can break down the task into following Tickets:

1. Create a new DB table to hold custom Agent Id's for each facility.

- The new table should contain following columns and references:

  `Table Name: facilities_agent_custom_id`
  | Column Name | Data Type | Description |
  |-------------|-----------|-------------|
  |id|INT| Unique Identifier for Custom Id|
  |facility_id|INT|Foreign key referencing Facility Table|
  |agent_id|INT|Foreign key referencing Agents Table|
  |custom_id|varchar(20)|Custom Id for given Agent provided by facility|

  Create Migrations for this table in codebase

  `Estimation: 4 hours`

2. Update Report Generation with Custom Agent ID's

   - We need to update our report generation mechanism (generateReport method)to include new custom Id's for each agent mapped to each facility from facilities_agent_custom_id table in place of regular agent id.

   
	 `Estimation: 16 hours`

3. Create a new API to return all the agents in a paginated manner to facilities.

   - A new API needs to be created to return all the Agents to facilities so that they can assign custom id to each agent. This API needs to return the list in a paginated manner.

  
	```
   Type: GET
   Path: <domain>/facilities/<version>/agent/list
   Header: Authorization header

   Return Value:
   Body: [
   	{
   		agent_id: id,
   		agent_name: name,
   		custom_id: custom_agent_id
   	}...
   ]
   ```

4. Create a new API to update Custom Agent Id's

   - A new API needs to be created to enable facilities to create custom Agent Id's. The API should have following format:

   ```
   Type: POST
   Path: <domain>/facilities/<version>/agent/custom_id
   Header: Authorization header
   Body:
   	Type: JSON
   	Sample:
   	{
   		agent_id: int //Agent's Primary Id in DB,
   		facility_id: int //Facility's primary Id in DB,
   		custom_id: string // Custom Id provided by facility admin
   	}

   Returns: 200 OK if custom Id is successfully saved.
   4xx/5xx if any error occurs during the process.
   ```

   Checks:

   - Only Facility Admin should be able to access this API.
   - The API should validate the Agent Id
   - Facility Id are valid, as well as
   - custom_id is a string of less than 20 characters.

   
	 `Estimation: 6 hours `

5. Add UI to add custom_ids for each agent for Facilities

   - We need to provide Facilities with a UI to add custom Id's for agents working for them. The UI should show all the agents that are available to work at that facility, and should give option to input custom id's for each agent. These custom id's should be limited to 20 characters.

   
	 `Estimation: 8 hours`

```
Total Estimation : 34 hours
Total Estimation with buffer: 34*1.3 = 44 Hours

Other than that we need time for Testing, bug fixing and deployment.
```
