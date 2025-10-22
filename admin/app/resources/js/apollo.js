// apollo.js
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core'

// URL de tu endpoint GraphQL
const httpLink = new HttpLink({
  uri: 'http://localhost:7205/graphql',
})

// Cache
const cache = new InMemoryCache()

// Cliente Apollo v4
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})