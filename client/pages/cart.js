import { useMutation, useQuery } from '@apollo/client'
import { GET_CARTS } from '../cache/queries'
import { CHECKOUT } from '../cache/mutations'
import CartComponent from '../components/CartComponent'
import NavbarHome from '../components/NavbarHome'
import { Button, Card } from 'react-bootstrap'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Cart.module.css'


function Cart () {
  let router = useRouter()
  const { loading, error, data} = useQuery(GET_CARTS);
  const [checkoutCart] = useMutation(CHECKOUT)
  if (error) {
    console.log(error)
  }

  function getTotal () {
    if (data) {
      let totalPrice = 0
      for (let i = 0; i < data["Carts"].length; i++) {
        totalPrice += (data["Carts"][i].price * data["Carts"][i].quantity)
      }
      return totalPrice
    }
  }

  function checkout () {
    checkoutCart()
    router.push("/history")
  }
  
  return (
    <>
    <Head>
        <title>foody</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet"></link>
      </Head>
    <NavbarHome />
    <main className={styles.main}>
      <h1 style={{fontFamily: "Lobster", fontSize: '3rem', marginBottom: '30px'}}>Your cart</h1>
    {
      data && !data["Carts"]?.length && <Image
        src="/empty-cart.png"
        alt="Your cart is empty"
        width={500}
        height={450}
      ></Image>
    }
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8 col-sm-12">
          {
            data && data["Carts"].map(cart => <CartComponent key={cart.id} cart={cart}/>)
          }
        </div>
        <div className="col-md-4 col-sm-12">
          {
            data?.["Carts"]?.length && 
            <Card style={{border: '1px solid', padding: '10px'}}>
              <h3>Order Summary</h3>
              <h5>{getTotal()}</h5>
              <Button onClick={checkout}>Checkout</Button>
            </Card>
          }
        </div>
      </div>
    </div>
    </main>

    </>
  )
}

export default Cart