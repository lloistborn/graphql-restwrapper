import express from "express";
import graphQLHTTP from "express-graphql";
import DataLoader from "dataloader";
import schema from "../graphql/schema";
import fetch from "node-fetch";

const BASE_URL = "http://localhost:5000";

function getPersonByURL(relativeUrl) {
    return fetch(`${BASE_URL}${relativeUrl}`)
        .then(res => res.json())
        .then(json => json.person)
        .then(person => person[0]);
}

const app = express();
app.use(graphQLHTTP(request => {
    const PersonLoader = new DataLoader(
        keys => Promise.all(keys.map(getPersonByURL))
    )

    const loaders = {
        person: PersonLoader
    };

    return {
        context: {loaders},
        schema,
        graphiql: true
    }
}))

app.listen(5001, function() {
    console.log("server listening on port: 5001");
});