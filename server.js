const express = require('express');
const { schema } = require('./graphql');
const { graphqlHTTP } = require('express-graphql');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
    pretty: true,
  })
);

app.listen(3000, () => {
  console.log('listening...!');
});
