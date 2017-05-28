# GraphQL as Wrapper for existing REST API
The Node-GraphQL-module is wrapping an existing Node-REST-API module.  

![NPM Version][npm-image]

## Installation
Both Node-GraphQL-module and Node-REST-API are using `ES6`.

To begin installation, go to directory of `package.json` each module.

1. cd to Node-GraphQL-module `cd graphql-restwrapper` then run `npm install` 
2. move directory to Node-REST-API `cd graphql-restwrapper/app-server` and then again run `npm install`

## Usage
1. Inside directory `graphql-restwrapper/app-server` run the node server using `npm start`
2. Open up new terminal and go to directory Node-GraphQL-module `cd graphql-restwrapper` then run `npm start`

After this operation, you have had two terminal opened running on port `5000` and `5001`.
Since The Node-GraphQL server running on `localhost:5001`, hit `localhost:5001/graphiql` to open `Graphiql` client.

### GraphQL Request Example
```
{
  person(id: "1") {
    firstName
    lastName
    userName
    id
    friends {
      firstName
      lastName
    }
  }
}
```
here are the response
```
{
  "data": {
    "person": {
      "firstName": "Mark",
      "lastName": "Zuckerberg",
      "userName": "mark1",
      "id": "1",
      "friends": [
        {
          "firstName": "Sophia",
          "lastName": "Latchuba"
        },
        {
          "firstName": "Mark",
          "lastName": "Zuckerberg"
        }
      ]
    }
  }
}
```
<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/datadog-metrics.svg?style=flat-square
