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
          <Link href="/"><Button variant="dark" style={{fontFamily: "Lobster"}}>Foody</Button></Link>
          <Nav className="mr-auto">
            <Link href="/cart"><Button variant="dark">Cart</Button></Link>
            <Link href="/history"><Button variant="dark">History</Button></Link>  
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