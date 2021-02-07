import { Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import Head from 'next/head'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../cache/mutations'
import { useRouter } from 'next/router'

function loginPage () {
  let router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loginUser, { error, data, loading }] = useMutation(LOGIN)
  function handleLogin (event) {
    event.preventDefault()
    console.log(email + " <<<< email" + password + " <<<< password")
    loginUser({ variables: { email: email, password: password } });
    setEmail("")
    setPassword("")
  }

  if (error) {
    console.log(error)
  }
  if (data) {
    localStorage.setItem("access_token", data.loginUser.access_token)
    router.push("/")
  }
  return (
    <>
     <Head>
        <title>Login</title>
      </Head>
      <h1>Login Page</h1>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(event) => {setEmail(event.target.value)}}/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(event) => {setPassword(event.target.value)}}/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  )
}

export default loginPage