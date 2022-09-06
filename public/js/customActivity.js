define(['postmonger'], function (Postmonger) {
    'use strict';

    let connection = new Postmonger.Session();
    let authTokens = {};
    let payload = {};

    // Configuration variables
    let eventSchema = ''; // variable is used in parseEventSchema()
    let lastnameSchema = ''; // variable is used in parseEventSchema()
    let eventDefinitionKey;

    $(window).ready(onRender);
    connection.on('initActivity', initialize);
    connection.on('clickedNext', save); //Save function within MC

    function onRender() {
        // JB will respond the first time 'ready' is called with 'initActivity'
        connection.trigger('ready');
        connection.trigger('requestTokens');
        connection.trigger('requestEndpoints');
    }

    /**
     * This function is to pull out the event definition within journey builder.
     * With the eventDefinitionKey, you are able to pull out values that passes through the journey
     */
    connection.trigger('requestTriggerEventDefinition');
    connection.on('requestedTriggerEventDefinition', function (eventDefinitionModel) {
        if (eventDefinitionModel) {
            eventDefinitionKey = eventDefinitionModel.eventDefinitionKey;
            // console.log('Request Trigger >>>', JSON.stringify(eventDefinitionModel));
        }
    });

    function initialize(data) {
        if (data) {
            payload = data;
        }
        initialLoad(data);
        parseEventSchema();
    }

    /**
     * Save function is fired off upon clicking of "Done" in Marketing Cloud
     * The config.json will be updated here if there are any updates to be done via Front End UI
     */
    function save() {
        // get the Key field from the Interactions API call for the journey
        var eventDefinitionKey = "APIEvent-8f92dbca-baa3-30f1-fb25-72f3a7e20059";
        
        payload['arguments'].execute.inArguments = [
            {"LetterRefId":"{{Event."+ eventDefinitionKey + ".LetterRefId}}"},
            {"EventInstanceID":"{{Event."+ eventDefinitionKey + ".EventInstanceID}}"},
            {"cloupra__Person__c":"{{Event."+ eventDefinitionKey + ".cloupra__Person__c}}"},
            {"Service_Id":"{{Event."+ eventDefinitionKey + ".Service_Id}}"},
            {"FirstName":"{{Event."+ eventDefinitionKey + ".FirstName}}"},
            {"Salutation":"{{Event."+ eventDefinitionKey + ".Salutation}}"},
            {"LastName":"{{Event."+ eventDefinitionKey + ".LastName}}"},
            {"MobilePhone":"{{Event."+ eventDefinitionKey + ".MobilePhone}}"},
            {"Email":"{{Event."+ eventDefinitionKey + ".Email}}"},
            {"Member_Identifier__c":"{{Event."+ eventDefinitionKey + ".Member_Identifier__c}}"},
            {"Is_Pension_Member_Account__c":"{{Event."+ eventDefinitionKey + ".Is_Pension_Member_Account__c}}"},
            {"Employer_Last_Contribution_Date__c":"{{Event."+ eventDefinitionKey + ".Employer_Last_Contribution_Date__c}}"},
            {"Cont_Member_Pre_Last_Date__c":"{{Event."+ eventDefinitionKey + ".Cont_Member_Pre_Last_Date__c}}"},
            {"Cont_Member_Post_Last_Date__c":"{{Event."+ eventDefinitionKey + ".Cont_Member_Post_Last_Date__c}}"},
            {"RO_Last_Rollover_Date__c":"{{Event."+ eventDefinitionKey + ".RO_Last_Rollover_Date__c}}"},
            {"HasInsurance":"{{Event."+ eventDefinitionKey + ".HasInsurance}}"},
            {"Preference_Center_Url__c":"{{Event."+ eventDefinitionKey + ".Preference_Center_Url__c}}"},
            {"Pension_Policy_Number__c":"{{Event."+ eventDefinitionKey + ".Pension_Policy_Number__c}}"},
            {"Account_Member_Number__c":"{{Event."+ eventDefinitionKey + ".Account_Member_Number__c}}"},
            {"Marketing_Account_Balance__c":"{{Event."+ eventDefinitionKey + ".Marketing_Account_Balance__c}}"},
            {"FUNDID":"{{Event."+ eventDefinitionKey + ".FUNDID}}"},
            {"BRAND_TYPE":"{{Event."+ eventDefinitionKey + ".BRAND_TYPE}}"},
            {"PLAN_NUMBER":"{{Event."+ eventDefinitionKey + ".PLAN_NUMBER}}"},
            {"DBCODE":"{{Event."+ eventDefinitionKey + ".DBCODE}}"},
            {"SUBFUND":"{{Event."+ eventDefinitionKey + ".SUBFUND}}"},
            {"template":"{{Event."+ eventDefinitionKey + ".template}}"},
            {"TemplateType":"{{Event."+ eventDefinitionKey + ".TemplateType}}"},
            {"DateEntered":"{{Event."+ eventDefinitionKey + ".DateEntered}}"},
            {"Communication_Name":"{{Event."+ eventDefinitionKey + ".Communication_Name}}"},
            {"Source__C":"{{Event."+ eventDefinitionKey + ".Source__C}}"},
            {"Type__C_Desc":"{{Event."+ eventDefinitionKey + ".Type__C_Desc}}"},
            {"DE_Key":"{{Event."+ eventDefinitionKey + ".DE_Key}}"},
            {"TestRecord":"{{Event."+ eventDefinitionKey + ".TestRecord}}"},
            {"DEROWID":"{{Event."+ eventDefinitionKey + "._customObjectKey}}"},
            {"TriggeredSendExternalKey":"{{Event."+ eventDefinitionKey + ".TriggeredSendExternalKey}}"}
        ];
        payload['metaData'].isConfigured = true;
        connection.trigger('updateActivity', payload);
    }

    /**
     * 
     * @param {*} data
     * 
     * This data param is the config json payload that needs to be loaded back into the UI upon opening the custom application within journey builder 
     * This function is invoked when the user clicks on the custom activity in Marketing Cloud. 
     * If there are information present, it should be loaded back into the appropriate places. 
     * e.g. input fields, select lists
     */
    function initialLoad(data) {
    };


    /**
     * This function is to pull the relevant information to create the schema of the objects
     * 
     * This function pulls out the schema for additional customizations that can be used.
     * This function leverages on the required field of "Last Name" to pull out the overall event schema
     * 
     * returned variables of: lastnameSchema , eventSchema.
     * eventSchema = Case:Contact:
     * lastnameSchema = Case:Contact:<last_name_schema>
     * 
     * View the developer console in chrome upon opening of application in MC Journey Builder for further clarity.
     */
    function parseEventSchema() {
        // Pulling data from the schema
        connection.trigger('requestSchema');
        connection.on('requestedSchema', function (data) {
            // save schema
            let dataJson = data['schema'];

            for (let i = 0; i < dataJson.length; i++) {

                // Last name schema and creation of event schema
                // Last name is a required field in SF so this is used to pull the event schema
                if (dataJson[i].key.toLowerCase().replace(/ /g, '').indexOf("lastname") !== -1) {
                    let splitArr = dataJson[i].key.split(".");
                    lastnameSchema = splitArr[splitArr.length - 1];
                    console.log('Last Name Schema >>', lastnameSchema);

                    let splitName = lastnameSchema.split(":");
                    let reg = new RegExp(splitName[splitName.length - 1], "g");
                    let oldSchema = splitArr[splitArr.length - 1];

                    eventSchema = oldSchema.replace(reg, "");
                    console.log("Event Schema >>", eventSchema);
                }
            }

        });
    }
});