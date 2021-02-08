import { gql } from '@apollo/client'

const GET_PRODUCTS = gql `
query getProducts{
  Products{
    id
    name
    price
    stock
    imageUrl
  }
}
`
const GET_CARTS = gql `
query getCart{
  Carts{
    id
    name
    price
    quantity
    ProductId
    imageUrl
  }
}
`
const GET_HISTORY = gql `
query getHistory{
  History{
    id
    name
    price
    quantity
    ProductId
    createdAt
    imageUrl
  }
}
`

export { GET_PRODUCTS, GET_CARTS, GET_HISTORY }