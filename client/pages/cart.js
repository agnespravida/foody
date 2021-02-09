import { useMutation, useQuery } from '@apollo/client'
import { GET_CARTS, GET_HISTORY, GET_PRODUCTS } from '../cache/queries'
import { CHECKOUT } from '../cache/mutations'
import CartComponent from '../components/CartComponent'
import NavbarHome from '../components/NavbarHome'
import { Button, Card } from 'react-bootstrap'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Cart.module.css'
import Swal from 'sweetalert2'


function Cart () {
  let router = useRouter()
  const { loading, error, data} = useQuery(GET_CARTS);
  const [checkoutCart] = useMutation(CHECKOUT, {
    refetchQueries: [
      {query: GET_PRODUCTS},
      {query: GET_HISTORY}
    ]
  })
  if (error) {
    console.log(error)
  }

  function getTotal () {
    if (data) {
      let totalPrice = 0
      for (let i = 0; i < data["Carts"].length; i++) {
        totalPrice += (data["Carts"][i].price * data["Carts"][i].quantity)
      }
      let rupiah = ''
      const angkarev = (totalPrice).toString().split('').reverse().join('')
      for (let i = 0; i < angkarev.length; i++) if (i % 3 === 0) rupiah += angkarev.substr(i, 3) + '.'
      return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('')
    }
  }

  function checkout () {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Checkout',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Successful!',
          'Your order has been proceed',
          'success'
        )
        checkoutCart()
        router.push("/history")
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your order has not been proceed:)',
          'error'
        )
      }
    })
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
            <Card className={styles.summary} variant="light">
              <Card.Header>
                <h3 style={{fontFamily: "Lobster"}}>Order Summary</h3>
              </Card.Header>
              <Card.Body>
                <p>Total Price: {getTotal()}</p>
              </Card.Body>
              <Card.Footer>
                <Button onClick={checkout}>Checkout</Button>
              </Card.Footer>
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