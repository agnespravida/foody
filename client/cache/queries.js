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

export { GET_PRODUCTS }