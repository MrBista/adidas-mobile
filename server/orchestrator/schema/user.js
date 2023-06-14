const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis({
  password: process.env.REDIS_PASSWORD,
  host: 'redis-15809.c292.ap-southeast-1-1.ec2.cloud.redislabs.com',
  port: 15809,
  username: 'default',
});
const urlUser = process.env.URL_USERS;
const typeDefs = `#graphql
  type User   {
        _id: String!
        username: String
        email: String
        role: String
        phoneNumber: String
        address: String
    }
  type MessageRegister{
    id:String!
    email:String
    username:String
  }
  type Message {
    message:String
  }
  input UserBody{ 
    username:String!
    email:String! 
    password:String! 
    phoneNumber:String! 
    address:String! 
    }

  type Query {
    getUser: [User]
    getUserById(id:String!):User
  }
  type Mutation {
    registerUser(content:UserBody!):MessageRegister!
    deleteUser(id:String!):Message
  }
`;
const resolvers = {
  Query: {
    getUser: async () => {
      try {
        const userCache = await redis.get('user:get');
        if (userCache) {
          let userRes = JSON.parse(userCache);
          return userRes;
        }
        const { data } = await axios.get(urlUser + '/users');
        await redis.set('user:get', JSON.stringify(data));
        return data;
      } catch (err) {
        throw err;
      }
    },
    getUserById: async (_, { id }) => {
      try {
        const exactUserCache = await redis.get('user:get:' + id);
        if (exactUserCache) {
          let userRes = JSON.parse(exactUserCache);
          return userRes;
        }
        const { data: response } = await axios.get(urlUser + '/users/' + id);
        redis.set(
          'user:get:' + response._id,
          JSON.stringify(response),
          'px',
          3
        );
        return response;
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    registerUser: async (
      _,
      { content: { username, email, password, phoneNumber, address } }
    ) => {
      const { data } = await axios({
        url: urlUser + '/users/register',
        data: { username, email, password, phoneNumber, address },
        method: 'post',
      });
      await redis.del('user:get');
      return data;
    },
    deleteUser: async (_, { id }) => {
      try {
        const { data } = await axios({
          url: urlUser + '/users/' + id,
          method: 'delete',
        });
        await redis.del('user:get');
        return data;
      } catch (err) {
        throw err;
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
