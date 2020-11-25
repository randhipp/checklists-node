# Node-Checklist - BE Test

![Checklist - Node.js CI](https://github.com/randhipp/checklists-node/workflows/Checklist%20-%20Node.js%20CI/badge.svg)

NodeJS using Express and Mongoose

## How To Run

- git clone this repo
- create new .env or rename .env.example to .env
- set db url for mongodb connection
- then run :

```bash
npm i
npm run debug
```

your api will run on http://localhost:3000

## LIVE DEV

This code was live on :    
https://checklists.wafvel.com:2087

code updated using github action.

# DOCS

https://documenter.getpostman.com/view/6587471/TVewZPtC

[postman.json]('ChecklistNode.postman_collection.json')
# Auth

Auth using token based express middleware

Dummy token was in app.js :

```js
const accessTokens = [
  "6d7f3f6e-269c-4e1b-abf8-9a0add479511",
  "110546ae-627f-48d4-9cf8-fd8850e0ac7f",
  "04b90260-3cb3-4553-a1c1-ecca1f83a381"
];
```

You can use one of thoose token to auth in api request `body.token` or in header `Authorization: Bearer {token}`

## TESTING ##

```bash
npm test
```

