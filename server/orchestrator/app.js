if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const axios = require('axios');
const {
  typeDefs: userTypeDef,
  resolvers: userResolvers,
} = require('./schema/user.js');
const {
  typeDefs: typeDefsProduct,
  resolvers: resolversProduct,
} = require('./schema/product.js');
(async () => {
  try {
    const server = new ApolloServer({
      typeDefs: [userTypeDef, typeDefsProduct],
      resolvers: [userResolvers, resolversProduct],
      introspection: true,
    });
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
    });

    console.log(`🚀  Server ready at: ${url}`);
  } catch (err) {
    console.log(err);
  }
})();
