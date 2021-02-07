import { Button } from 'react-bootstrap'
import { ADD_TO_CART, REMOVE_FROM_CART, EMPTY_CART } from '../cache/mutations'
import { GET_CARTS, GET_PRODUCTS } from '../cache/queries'
import { useMutation } from '@apollo/client'

function CartComponent (props) {
  const [addToCart, { data: addToCartData, loading: addToCartLoading, error: addToCartError }] = useMutation(ADD_TO_CART, {
    refetchQueries: [
      {query: GET_CARTS},
      {query: GET_PRODUCTS}
    ]
  })
  const [removeFromCart, { data: removeFromCartData, loading: removeFromCartLoading, error: removeFromCartError }] = useMutation(REMOVE_FROM_CART, {
    refetchQueries: [
      {query: GET_CARTS},
      {query: GET_PRODUCTS}
    ]
  })
  const [emptyCart] = useMutation(EMPTY_CART, {
    refetchQueries: [
      {query: GET_CARTS},
      {query: GET_PRODUCTS}
    ]
  })
  function handleAddToCart () {
    if (localStorage.getItem("access_token")) {
      // clearTimeout()
      addToCart({ variables: { id: props.cart.ProductId } });
      // setTimeout(() => {
      //   emptyCart()
      // }, 5000)
    }
  }
  function handleRemoveFromCart () {
    if (localStorage.getItem("access_token")) {
      // clearTimeout()
      removeFromCart({ variables: { id: props.cart.ProductId } });
      // setTimeout(() => {
      //   emptyCart()
      // }, 5000)
    }
  }

  return (
    <>
     <div>{props.cart.name}</div>
     <div>{props.cart.price}</div>
     <Button onClick={handleAddToCart}>+</Button>
     <Button>{props.cart.quantity}</Button>
     <Button onClick={handleRemoveFromCart}>-</Button>
    </>
  )
}

export default CartComponent