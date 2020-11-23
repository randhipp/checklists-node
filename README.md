# Node-Checklist - BE Test

NodeJS using Express and Mongoose

## How To Run

git clone

```bash
npm i
npm run debug
```

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