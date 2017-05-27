import {
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema
} from "graphql";

import {
    fromGlobalId,
    globalIdField,
    nodeDefinitions,
} from 'graphql-relay';

const BASE_URL = "localhost:5000";

const {
    nodeInterface,
    nodeField
} = nodeDefinitions(
    globalId => {
        const {
            type,
            id
        } = fromGlobalId(globalId);
        if (type === 'Person') {
            return fetchPersonByURL(`/people/${id}/`);
        }
    },
    object => {
        if (object.hasOwnProperty('username')) {
            return 'Person';
        }
    },
);

function fetchResponseByUrl(relativeUrl) {
    return fetch(`${BASE_URL}${relativeUrl}`).then(res => res.json());
}

function fetchPeople() {
    return fetchResponseByUrl("/people").then(json => json.people);
}

function fetchPersonByURL(relativeURL) {
    return fetchResponseByURL(relativeURL).then(json => json.person);
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
        id: globalIdField('Person'),
        username: {
            type: GraphQLString
        },
        friends: {
            type: new GraphQLList(PersonType),
            resolve: person => person.friends.map(fetchPersonByURL)
        }
    }),
    interfaces: [ nodeInterface ],
});

const QueryType = new GraphQLObjectType({
    name: "Query",
    description: "the root of all queries",
    fields: () => ({
        allPeople: {
            type: new GraphQLList(PersonType),
            resolve: root => fetchPeople
        },
        node: nodeField,
        person: {
            type: PersonType,
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve: (root, args) => fetchPersonByURL(`/people/${args.id}/`)
        }
    })
});

export default new GraphQLSchema({
    query: QueryType
});