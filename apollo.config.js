/** @type {import('apollo').ApolloConfig} */
const apolloConfig = {
  client: {
    excludes: ['./node_modules/**'],
    includes: ['./src/graph-query/*.ts', './src/graph-query/**/*.ts'],
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
