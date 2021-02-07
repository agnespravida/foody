import Link from 'next/link'
import { Nav, Navbar } from 'react-bootstrap'

function NavbarHome () {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem("access_token")) {
      return (
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="mr-auto">
            <Link href="/cart"><a>Cart</a></Link>
            <Link href="/history"><a>History</a></Link>  
          </Nav>
        </Navbar>
      )
    }
  }
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Navbar</Navbar.Brand>
      <Nav className="mr-auto">
        <Link href="/login"><a>Login</a></Link> 
      </Nav>
    </Navbar>
  )
}

export default NavbarHome