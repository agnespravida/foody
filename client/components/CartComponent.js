import { Button } from 'react-bootstrap'
import { ADD_TO_CART, REMOVE_FROM_CART } from '../cache/mutations'
import { GET_CARTS } from '../cache/queries'
import { useMutation } from '@apollo/client'

function CartComponent (props) {
  const [addToCart, { data: addToCartData, loading: addToCartLoading, error: addToCartError }] = useMutation(ADD_TO_CART, {
    refetchQueries: [
      {query: GET_CARTS}
    ]
  })
  // const [removeFromCart, { data: removeFromCartData, loading: removeFromCartLoading, error: removeFromCartError }] = useMutation(REMOVE_FROM_CART, {
  //   refetchQueries: [
  //     {query: GET_CARTS}
  //   ]
  // })
  function handleAddToCart () {
    if (localStorage.getItem("access_token")) {
      addToCart({ variables: { id: props.cart.ProductId } });
    }
  }
  // function handleRemoveFromCart () {
  //   if (localStorage.getItem("access_token")) {
  //     removeFromCart({ variables: { id: props.cart.ProductId } });
  //   }
  // }

  // if (removeFromCartError) {
  //   console.log(removeFromCartError)
  // }

  return (
    <>
     <div>{props.cart.name}</div>
     <div>{props.cart.price}</div>
     <Button onClick={handleAddToCart}>+</Button>
     <Button>{props.cart.quantity}</Button>
     <Button>-</Button>
    </>
  )
}

export default CartComponent