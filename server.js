const path = require('path');
const express = require('express');
const { graphqlHTTP} = require('express-graphql');

const { loadFilesSync } = require('@graphql-tools/load-files')
const { makeExecutableSchema } = require('@graphql-tools/schema');

const typesArray = loadFilesSync(__dirname,'**/*', {
    extensions: ['graphql'],
});

const resolversArray =  loadFilesSync(path.join(__dirname, '**/*.resolvers', {
    extensions: ['js']
}));

const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: resolversArray,
})


const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(3000, () => {
    console.log('Running GraphQL server');
});