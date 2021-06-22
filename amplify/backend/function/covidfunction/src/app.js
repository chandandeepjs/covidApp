/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

/* Amplify Params - DO NOT EDIT
	API_COVIDAPP_GRAPHQLAPIIDOUTPUT
	API_COVIDAPP_PATIENTTABLE_ARN
	API_COVIDAPP_PATIENTTABLE_NAME
	ENV
	REGION
	STORAGE_DYNMOCOVID_ARN
	STORAGE_DYNMOCOVID_NAME
Amplify Params - DO NOT EDIT */

const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
const app = express();

app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.get("/items", (req, res) => {

  docClient.scan(
    {
      TableName: process.env.API_COVIDAPP_PATIENTTABLE_NAME
    },
    function(err, data) {
      if (err) res.json({ err });
      else {

        console.log("=========data",data.Items)
      let arry = data.Items
      let InDeath = [];
      let InInactive = [];
      let Active = [];
      let UsDeath = [];
      let UsInactive = [];
      let UsActive = [];
      let UkDeath = [];
      let UkActive = [];
      let UkInactive = [];

      arry.forEach(item => {
        if (item.country === "India" && item.status === "death") {
          InDeath.push(item);
        }
        if (item.country === "India" && item.status === "inActive") {
          InInactive.push(item);
        }
        if (item.country === "India" && item.status === "active") {
          Active.push(item);
        }
        if (item.country === "US" && item.status === "death") {
          UsDeath.push(item);
        }
        if (item.country === "US" && item.status === "active") {
          UsActive.push(item);
        }
        if (item.country === "US" && item.status === "inActive") {
          UsInactive.push(item);
        }
        if (item.country === "UK" && item.status === "death") {
          UkDeath.push(item);
        }
        if (item.country === "UK" && item.status === "active") {
          UkActive.push(item);
        }
        if (item.country === "UK" && item.status === "inActive") {
          UkInactive.push(item);
        }
      });
      let response = [ 
        {
          id: 1,
          country: "India",
          Death: InDeath.length,
          active: Active.length,
          inactive: InInactive.length,
        },
        {
          id: 2,
          country: "united state",
          Death: UsDeath.length,
          active: UsActive.length,
          inactive: UsInactive.length,
        },
        {
          id: 3,
          country: "united kingdom",
          Death: UkDeath.length,
          active: UkActive.length,
          inactive: UkInactive.length,
        },
      ]
        res.json({ success: response })
      };
    }
  );

});

module.exports = app;
