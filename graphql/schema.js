import {
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema
} from "graphql";

import fetch from "node-fetch";

const BASE_URL = "localhost:5001";

function getPersonByURL(relativeUrl) {
    return fetch(`${BASE_URL}${relativeUrl}`)
        .then(res => res.json())
        .then(json => json.person);
}

const PersonType = new GraphQLObjectType({
    name: "Person",
    type: "Somebody",
    fields: () => ({
        firstName: {
            type: GraphQLString,
            resolve: person => person.firstName
        },
        lastName: {
            type: GraphQLString,
            resolve: person => person.lastName
        },
        email: {
            type: GraphQLString
        },
        id: {
            type: GraphQLString
        },
        username: {
            type: GraphQLString
        },
        friends: {
            type: new GraphQLList(PersonType),
            resolve: person => person.friends.map(getPersonByURL)
        }
    })
});

const QueryType = new GraphQLObjectType({
    name: "Query",
    description: "the root of all queries",
    fields: () => ({
        person: {
            type: PersonType,
            args: {
                id: { type: GraphQLString }
            },
            resolve: (root, args) => getPersonByURL(`/people/${args.id}`)
        }
    })
});

export default new GraphQLSchema({
    query: QueryType
});