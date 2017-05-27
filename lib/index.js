import express from "express";
import graphQLHTTP from "express-graphql";
import schema from "../graphql/schema";

const app = express();

app.use(graphQLHTTP({
    schema,
    graphiql: true
}))

app.listen(5001, function() {
    console.log("server listening on port: 5001");
});