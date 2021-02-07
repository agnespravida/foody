import { gql } from '@apollo/client'

const GET_PRODUCTS = gql `
query getProducts{
  Products{
    id
    name
    price
    stock
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
  }
}
`

export { GET_PRODUCTS, GET_CARTS }