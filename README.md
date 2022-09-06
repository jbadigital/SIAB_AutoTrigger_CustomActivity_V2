# SIAB_AutoTrigger_CustomActivity_V2

# Mercer Marketing Cloud Journey Builder Custom Activity 
> This custom activity for Mercer's Marketing Cloud Journey Builder Custom Activity. It is hosted on Heroku and running on NodeJS

This application is to be hosted on Heroku with specific credentials set up in the environment variables for it to be linked with Marketing Cloud.
The application has a function that authenticates according the enhanced package Oauth2.

## Usage

Drag and drop it into the Journey Builder Canvas. Set up the application if necessary through the UI.

## Application Setup

After uploading into Heroku and allowing the HTTPS to be set up, fill in the application URL within `config.json`

Necessary steps thats required to set up the application.

1. Create an package within Marketing Cloud.
2. Add the API integration component making sure it's a Server - Server integration.
3. Add the Journey Builder Activity component.
4. Grab the `unique key` from the journey builder activity and place it within `config.json`.
5. Grab the client ID, client secret, JWT Signing Secret and place it within Heroku as a env variables.
    - `jwtSecret`
    - `clientId`
    - `clientSecret`
6. Grab the Authentication Base URI and place it within the environment variable in Heroku.
    - `authenticationUrl`
7. Grab the HTTPS URL that is created by Heroku and place it within config.json replacing `<HTTPS_URL_OF_APP>`.

## Release History

* 1.0.0
    * Initial Push

## Meta

IVE Group 
