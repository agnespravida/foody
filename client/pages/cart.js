import { useMutation, useQuery } from '@apollo/client'
import { GET_CARTS } from '../cache/queries'
import { CHECKOUT } from '../cache/mutations'
import CartComponent from '../components/CartComponent'
import NavbarHome from '../components/NavbarHome'
import { Button } from 'react-bootstrap'
import { useRouter } from 'next/router'

function Cart () {
  let router = useRouter()
  const { loading, error, data} = useQuery(GET_CARTS);
  const [checkoutCart] = useMutation(CHECKOUT)
  if (error) {
    console.log(error)
  }

  function checkout () {
    checkoutCart()
    router.push("/history")
  }
  
  return (
    <>
    <NavbarHome />
    {
      data && data["Carts"].map(cart => <CartComponent key={cart.id} cart={cart}/>)
    } <br/>
    {
      data?.["Carts"]?.length && <Button onClick={checkout}>Checkout</Button>
    }

    </>
  )
}

export default Cart