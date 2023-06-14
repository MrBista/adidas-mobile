import { gql } from '@apollo/client';

const GET_PRODUCTS = gql`
  query GetProducts {
    getProducts {
      id
      name
      description
      price
      mainImg
      Category {
        name
      }
      Images {
        id
        imgUrl
      }
      author {
        username
        email
      }
      categoryId
    }
  }
`;

const GET_PRODUCTS_DETAIL = gql`
  query GetProductById($getProductByIdId: Int!) {
    getProductById(id: $getProductByIdId) {
      Category {
        name
      }
      Images {
        imgUrl
        id
      }
      author {
        username
        email
      }
      description
      id
      mainImg
      name
      price
    }
  }
`;

export { GET_PRODUCTS, GET_PRODUCTS_DETAIL };
