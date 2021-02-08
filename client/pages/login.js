import { Form, Button, Card } from 'react-bootstrap'
import { useState } from 'react'
import Head from 'next/head'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../cache/mutations'
import { useRouter } from 'next/router'
import styles from '../styles/Login.module.css'
import Image from 'next/image'

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
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet"></link>
      </Head>
      <main className={styles.main}>
        <Card className={styles.card}>
        <Image
          src="/logo.png"
          alt="Foody logo"
          width={250}
          height={200}
      />
          <h1 style={{fontFamily: "Lobster", textAlign: 'center', fontSize: '3rem'}}>Foody</h1><br/>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(event) => {setEmail(event.target.value)}}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Password" value={password} onChange={(event) => {setPassword(event.target.value)}}/>
            </Form.Group>
            <Button variant="primary" type="submit" block>
              Log In
            </Button>
          </Form>
        </Card>
      </main>
    </>
  )
}

export default loginPage