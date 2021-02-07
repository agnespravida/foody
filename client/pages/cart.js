import { useQuery } from '@apollo/client'
import { GET_CARTS } from '../cache/queries'
import CartComponent from '../components/CartComponent'
import { Button } from 'react-bootstrap'

function Cart () {
  const { loading, error, data} = useQuery(GET_CARTS);
  if (error) {
    console.log(error)
  }
  
  return (
    <>
    {
      data && data["Carts"].map(cart => <CartComponent key={cart.id} cart={cart}/>)
    } <br/>
    <Button>Checkout</Button>

    </>
  )
}

export default Cart