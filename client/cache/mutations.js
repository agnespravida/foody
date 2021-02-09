import { gql } from '@apollo/client'

const LOGIN = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      access_token
    }
  }
`;
const ADD_TO_CART = gql`
  mutation addToCart($id: ID!) {
    addToCart(id: $id) {
      message
    }
  }
`;
const REMOVE_FROM_CART = gql`
  mutation removeFromCart($id: ID!) {
    removeFromCart(id: $id) {
      message
    }
  }
`;
const EMPTY_CART = gql`
  mutation emptyCart {
    emptyCart {
      message
    }
  }
`;
const CHECKOUT = gql`
  mutation checkout {
    checkout {
      message
    }
  }
`;


export { LOGIN, ADD_TO_CART, REMOVE_FROM_CART, EMPTY_CART, CHECKOUT }
