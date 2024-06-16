import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://determined-departmental-saving-dh.trycloudflare.com/graphql', //backend link
  cache: new InMemoryCache(),
});

export default client;