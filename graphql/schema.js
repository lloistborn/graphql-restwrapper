import {
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema
} from "graphql";

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
        userName: {
            type: GraphQLString
        },
        friends: {
            type: new GraphQLList(PersonType),
            resolve: (person, args, {loaders}) => loaders.person.loadMany(person.friends)
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
            resolve: (root, args, {loaders}) => loaders.person.load(`/people/${args.id}`)
        }
    })
});

export default new GraphQLSchema({
    query: QueryType
});