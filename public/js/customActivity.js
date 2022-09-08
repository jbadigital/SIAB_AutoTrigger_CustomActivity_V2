define([
    'postmonger'
], function (
    Postmonger
) {
    'use strict';


    var connection = new Postmonger.Session();
	
    var authTokens = {};
    var payload = {};
    $(window).ready(onRender);

    connection.on('initActivity', initialize);
    connection.on('requestedTokens', onGetTokens);
    connection.on('requestedEndpoints', onGetEndpoints);

    connection.on('clickedNext', save);
   
    function onRender() {
        // JB will respond the first time 'ready' is called with 'initActivity'
        connection.trigger('ready');

        connection.trigger('requestTokens');
        connection.trigger('requestEndpoints');

    }

    function initialize(data) {
        console.log(data);
        if (data) {
            payload = data;
        }
        
        var hasInArguments = Boolean(
            payload['arguments'] &&
            payload['arguments'].execute &&
            payload['arguments'].execute.inArguments &&
            payload['arguments'].execute.inArguments.length > 0
        );

        var inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};

        console.log(inArguments);

        $.each(inArguments, function (index, inArgument) {
            $.each(inArgument, function (key, val) {
                
              
            });
        });

        connection.trigger('updateButton', {
            button: 'next',
            text: 'done',
            visible: true
        });
    }

    function onGetTokens(tokens) {
        console.log(tokens);
        authTokens = tokens;
    }

    function onGetEndpoints(endpoints) {
        console.log(endpoints);
    }

    function save() {
    	
		// get the Key field from the Interactions API call for the journey
        var eventDefinitionKey = "DEAudience-a3a59070-24f5-5e88-66cd-3343c2e0f308";
        
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
            {"TestRecord":"{{Event."+ eventDefinitionKey + ".TestRecord}}"},
            {"DEROWID":"{{Event."+ eventDefinitionKey + "._customObjectKey}}"},
            {"TriggeredSendExternalKey":"{{Event."+ eventDefinitionKey + ".TriggeredSendExternalKey}}"}];
        
        payload['metaData'].isConfigured = true;

        console.log(payload);
        connection.trigger('updateActivity', payload);
    }


});
