const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis({
  password: process.env.REDIS_PASSWORD,
  host: 'redis-15809.c292.ap-southeast-1-1.ec2.cloud.redislabs.com',
  port: 15809,
  username: 'default',
});
const urlProduct = process.env.URL_PRODUCTS;
const urlUsers = process.env.URL_USERS;
const typeDefs = `#graphql
  type Category{
            id: Int!
            name: String
  }
  type Image{
                id: Int!
                productId: Int!
                imgUrl: String!
            }
  type Author{
    id:String
    username:String!
    email:String
    role:String
  }
  type Product{
        id: Int!
        name: String
        slug: String
        description:String
        price: Int
        mainImg: String
        categoryId: Int!
        authorId: Int!
        mongoId: String
        createdAt: String
        updatedAt: String
        Category: Category
        Images: [Image]
        author:Author
    }
  type Message{
    message:String!
  }

    input ImageInput{
        imgUrl: String!
    }

  input ProductBody { 
      name: String!
      description:String! 
      price:Int! 
      mainImg:String!
      categoryId:Int!
      images:[ImageInput]
    }

    type Query{
      getProducts:[Product]
      getProductById(id:Int!):Product
    }
    type Mutation{
      deleteProduct(id:Int!):Message
      addProduct(content:ProductBody!):Message
      updateProduct(id:Int!,content:ProductBody!):Message
    }
`;
const resolvers = {
  Query: {
    getProducts: async () => {
      try {
        const productData = await redis.get('products:get');
        if (productData) {
          let resData = JSON.parse(productData);
          return resData;
        }
        console.log('masuk sini 2');
        const { data: users } = await axios.get(urlUsers + '/users');
        let { data } = await axios.get(urlProduct + '/');
        let result = data.map((el) => {
          let authorFounded = {};
          users.forEach((user) => {
            if (user._id === el.mongoId) {
              authorFounded.username = user.username;
              authorFounded.email = user.email;
              authorFounded.role = user.role;
              authorFounded.id = user._id;
            }
          });
          return { ...el, author: authorFounded };
        });
        await redis.set('products:get', JSON.stringify(result));
        return result;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    getProductById: async (_, { id }) => {
      try {
        const detailProduct = await redis.get('products:get' + id);
        if (detailProduct) {
          const resDetail = JSON.parse(detailProduct);
          return resDetail;
        }
        const { data } = await axios.get(urlProduct + '/' + id);
        await redis.set('products:get' + id, JSON.stringify(data), 'px', 4000);
        return data;
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    addProduct: async (
      _,
      { content: { name, description, price, mainImg, categoryId, images } }
    ) => {
      try {
        const { data } = await axios.post(urlProduct, {
          name,
          description,
          price,
          mainImg,
          categoryId,
          images,
        });
        await redis.del('products:get');
        return data;
      } catch (err) {
        throw err;
      }
    },
    updateProduct: async (
      _,
      { id, content: { name, description, price, mainImg, categoryId, images } }
    ) => {
      try {
        const { data } = await axios({
          method: 'put',
          data: { name, description, price, mainImg, categoryId, images },
          url: urlProduct + '/' + id,
        });
        await redis.del('products:get');
        return data;
      } catch (err) {
        throw err;
      }
    },
    deleteProduct: async (_, { id }) => {
      try {
        const { data } = await axios({
          method: 'delete',
          url: urlProduct + '/' + id,
        });
        await redis.del('products:get');
        return data;
      } catch (err) {
        throw err;
      }
    },
  },
};

module.exports = {
  resolvers,
  typeDefs,
};
