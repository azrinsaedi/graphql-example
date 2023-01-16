const path = require('path');
const express = require('express');
// const { graphqlHTTP} = require('express-graphql');


const { loadFilesSync } = require('@graphql-tools/load-files')
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { ApolloServer } = require('apollo-server-express');

const typesArray = loadFilesSync(__dirname,'**/*', {
    extensions: ['graphql'],
});

const resolversArray =  loadFilesSync(path.join(__dirname, '**/*.resolvers', {
    extensions: ['js']
}));

async function startApolloServer() {
    const app = express();

    const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: resolversArray,
})

    const server = new ApolloServer({ schema });

    await server.start();
    server.applyMiddleware({ app, path: '/graphql' })

    app.listen(3000, () => {
        console.log('Running GraphQL server');
    });

}

startApolloServer();

// const schema = makeExecutableSchema({
//     typeDefs: typesArray,
//     resolvers: resolversArray,
// })


// const app = express();

// app.use('/graphql', graphqlHTTP({
//     schema: schema,
//     graphiql: true
// }));

// app.listen(3000, () => {
//     console.log('Running GraphQL server');
// });