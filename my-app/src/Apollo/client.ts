import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', //backend link
  cache: new InMemoryCache(),
});

export default client;
