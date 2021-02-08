import { Button, Card, ProgressBar } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import { ADD_TO_CART, EMPTY_CART } from '../cache/mutations'
import { GET_CARTS, GET_PRODUCTS } from '../cache/queries'
import styles from '../styles/Home.module.css'

function ProductCard (props) {
  const [addToCart, { data, loading, error }] = useMutation(ADD_TO_CART, {
    refetchQueries: [
      {query: GET_PRODUCTS},
      {query: GET_CARTS}
    ]
  })
  const [emptyCart] = useMutation(EMPTY_CART, {
    refetchQueries: [
      {query: GET_PRODUCTS},
      {query: GET_CARTS}
    ]
  })
  let router = useRouter()

  function handleAddToCart () {
    if (localStorage.getItem("access_token")) {
      // clearTimeout()
      addToCart({ variables: { id: props.product.id } });
      // setTimeout(() => {
      //   emptyCart()
      // }, 5000)
    }
    else {
      router.push("/login")
    }
  }

  if (error) {
    console.log(error)
    return <div>Error ...</div>
  }
  return (
    <>
      <Card className={styles.card}>
      <Card.Img variant="top" src={props.product.imageUrl} />
        <Card.Body>
          <p style={{fontSize: '0.8rem', marginBottom: '5px'}}>{props.product.name}</p>
          <p style={{fontSize: '0.8rem', marginBottom: '5px'}}><b>Rp. {props.product.price}</b></p>
          <ProgressBar variant={props.product.stock > 6 ? "info":"danger"} now={props.product.stock*10} label={`${props.product.stock} items`}/>
          <Button style={{marginTop: '5px'}} onClick={handleAddToCart}>Add to cart</Button>
        </Card.Body>
      </Card>
    </>
  )
}

export default ProductCard