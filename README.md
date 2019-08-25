[![Build Status](https://travis-ci.com/macphilips/population-management.svg?branch=develop)](https://travis-ci.com/macphilips/sms-api)
[![Maintainability](https://api.codeclimate.com/v1/badges/0d0e633fe07a04496c9c/maintainability)](https://codeclimate.com/github/macphilips/population-management/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/0d0e633fe07a04496c9c/test_coverage)](https://codeclimate.com/github/macphilips/population-management/test_coverage)

## Population Management
Population Management System that contains a list of locations and the total number of residents in each location broken down by gender

##  Documentation
The API documentation can be found here: http://localhost:3000/docs/api


## Technologies Used
- Node/Expressjs
- database: Postgresql

## Features
- Create a new location containing data on the total number of male and female residents within it.
- List all available locations and their population summaries.
- Update data for a specific locations
- Delete a specified location

## To Install
- Download or clone the repo
- open terminal inside root directory of cloned folder
- type `npm install` to install all dependencies
- type `npm run db:rollmigrate` run migrations
- add a env file amd add the database url and type check env.sample for example
- `npm run start:dev` to run in development mode
- `npm run start` to run in production mode
- `npm run test` to run in production mode

