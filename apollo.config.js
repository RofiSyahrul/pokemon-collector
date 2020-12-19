/** @type {import('apollo').ApolloConfig} */
const apolloConfig = {
  client: {
    excludes: ['./node_modules/**'],
    includes: ['./graph-query/*.ts', './graph-query/**/*.ts'],
    tagName: 'gql',
    addTypename: false,
    service: {
      name: 'graphql-pokeapi',
      url: 'https://graphql-pokeapi.vercel.app/api/graphql',
      skipSSLValidation: true,
    },
  },
}

module.exports = apolloConfig
