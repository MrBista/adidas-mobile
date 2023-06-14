import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
const client = new ApolloClient({
  uri: 'https://aws.adidas-mobile-apps.site',
  cache: new InMemoryCache(),
});
export default client;
