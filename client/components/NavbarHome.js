import Link from 'next/link'
import { Nav, Navbar, Button } from 'react-bootstrap'
import { useRouter } from 'next/router'

function NavbarHome () {

  let router = useRouter()

  function logout () {
    localStorage.removeItem("access_token")
    router.push("/")
  }

  if (typeof window !== 'undefined') {
    if (localStorage.getItem("access_token")) {
      return (
        <Navbar bg="dark" variant="dark">
          <Nav className="mr-auto">
            <Link href="/"><Button variant="dark" style={{fontFamily: "Lobster"}}>Foody</Button></Link>
          </Nav>
          <Nav>
              <Link href="/cart"><i className="fa fa-shopping-cart" style={{fontSize: '24px', color: 'white', margin: '10px'}}></i></Link>  
              <Link href="/history"><i className="fa fa-history" style={{fontSize: '24px', color: 'white', margin: '10px'}}></i></Link> 
            <Button variant="dark" onClick={logout}>Logout</Button>  
          </Nav>
        </Navbar>
      )
    }
    return (
      <Navbar bg="dark" variant="dark">
        <Nav className="mr-auto">
          <Link href="/"><Button variant="dark" style={{fontFamily: "Lobster", fontSize: '22px'}}>Foody</Button></Link>
        </Nav>
        <Nav>
          <Link href="/login"><Button variant="dark">Login</Button></Link>
        </Nav>
      </Navbar>
    )
  }

  return (
    <Navbar bg="dark" variant="dark">
    </Navbar>
  )
}

export default NavbarHome