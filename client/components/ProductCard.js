import { Button } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import { ADD_TO_CART } from '../cache/mutations'
import { GET_PRODUCTS } from '../cache/queries'

function ProductCard (props) {
  const [addToCart, { data, loading, error }] = useMutation(ADD_TO_CART, {
    refetchQueries: [
      {query: GET_PRODUCTS}
    ]
  })
  let router = useRouter()

  function handleAddToCart () {
    if (localStorage.getItem("access_token")) {
      addToCart({ variables: { id: props.product.id } });
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