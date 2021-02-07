import { Button } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import { ADD_TO_CART, EMPTY_CART } from '../cache/mutations'
import { GET_CARTS, GET_PRODUCTS } from '../cache/queries'

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
     <p>{props.product.name}; {props.product.price}; {props.product.stock}</p>
     <Button onClick={handleAddToCart}>Add to cart</Button>
    </>
  )
}

export default ProductCard