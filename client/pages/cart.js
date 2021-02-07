import { useQuery } from '@apollo/client'
import { GET_CARTS } from '../cache/queries'
import CartComponent from '../components/CartComponent'
import NavbarHome from '../components/NavbarHome'
import { Button } from 'react-bootstrap'

function Cart () {
  const { loading, error, data} = useQuery(GET_CARTS);
  if (error) {
    console.log(error)
  }


  
  return (
    <>
    <NavbarHome />
    {
      data && data["Carts"].map(cart => <CartComponent key={cart.id} cart={cart}/>)
    } <br/>
    {
      data?.["Carts"]?.length && <Button>Checkout</Button>
    }

    </>
  )
}

export default Cart