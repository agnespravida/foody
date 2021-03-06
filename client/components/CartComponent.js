import { Button, Card, ButtonGroup } from 'react-bootstrap'
import { ADD_TO_CART, REMOVE_FROM_CART, EMPTY_CART } from '../cache/mutations'
import { GET_CARTS, GET_PRODUCTS } from '../cache/queries'
import { useMutation } from '@apollo/client'
import styles from '../styles/Cart.module.css'
import Image from 'next/image'

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
      clearTimeout()
      addToCart({ variables: { id: props.cart.ProductId } });
      setTimeout(() => {
        emptyCart()
      }, 60000)
    }
  }
  function handleRemoveFromCart () {
    if (localStorage.getItem("access_token")) {
      clearTimeout()
      removeFromCart({ variables: { id: props.cart.ProductId } });
      setTimeout(() => {
        emptyCart()
      }, 60000)
    }
  }

  function convertedRupiah () {
    let rupiah = ''
    const angkarev = (props.cart.price).toString().split('').reverse().join('')
    for (let i = 0; i < angkarev.length; i++) if (i % 3 === 0) rupiah += angkarev.substr(i, 3) + '.'
    return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('')
  }

  return (
    <>
    <Card className={styles.card}>
      <img src={props.cart.imageUrl} alt={props.cart.name} width="85" height="85" style={{marginRight: '20px'}}/>
      <div style={{marginRight: '20px', textAlign: 'center'}}>
        <p style={{fontSize: '1rem', marginBottom: '5px'}}>{props.cart.name}</p>
        <p style={{fontSize: '1rem', marginBottom: '5px'}}><b>{convertedRupiah()}</b></p>
      </div>
      <ButtonGroup aria-label="Basic example">
        <Button variant="secondary" onClick={handleAddToCart}>+</Button>
        <Button variant="outline-dark">{props.cart.quantity}</Button>
        <Button variant="secondary" onClick={handleRemoveFromCart}>-</Button>
      </ButtonGroup>
    </Card>
    </>
  )
}

export default CartComponent