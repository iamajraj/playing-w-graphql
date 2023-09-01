const graphql = require('graphql');

const PersonType = new graphql.GraphQLObjectType({
  name: 'Person',
  fields: {
    id: {
      type: graphql.GraphQLInt,
    },
    name: {
      type: graphql.GraphQLString,
    },
  },
});

const persons = [];
const names = ['Muhammad Ali', 'Raj', 'Akmal', 'Hossain', 'Ali'];
names.forEach((name, i) => persons.push({ name, id: i + 1 }));

const Persons = {
  type: new graphql.GraphQLList(PersonType),
  resolve() {
    return persons;
  },
};

const RootQuery = new graphql.GraphQLObjectType({
  fields: {
    Persons,
    getPerson: {
      type: PersonType,
      args: {
        id: {
          type: graphql.GraphQLInt,
        },
      },
      resolve(_, { id }) {
        return persons.find((p) => p.id === id);
      },
    },
    createPerson: {
      type: PersonType,
      args: {
        name: {
          type: graphql.GraphQLString,
        },
      },
      resolve(_, { name }) {
        const new_person = { name, id: persons.length + 1 };
        persons.push(new_person);
        return new_person;
      },
    },
  },
  name: 'RootQuery',
});

const schema = new graphql.GraphQLSchema({
  query: RootQuery,
});

module.exports = {
  schema,
};
// graphql
//   .graphql({ schema, source: '{Persons{name}}' })
//   .then((value) => {
//     console.log(value.data.Persons);
//   })
//   .catch((er) => console.log(er));
