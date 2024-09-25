#!/bin/bash

curl --location --request POST 'https://mieszkanie-rewards.azurewebsites.net/tasks/sync-completed' --header 'accept: text/plain'