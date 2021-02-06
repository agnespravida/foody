import { Jumbotron, Container } from 'react-bootstrap'
import styles from '../styles/Jumbotron.module.css'

function JumbotronComp () {
  return (
    <>
      <Jumbotron fluid className={styles.jumbotronimage}>
        <Container className={styles.container}>
          <h1 style={{color: 'white', fontSize: '7rem'}}>foody</h1>
        </Container>
      </Jumbotron>
    </>
  )
}

export default JumbotronComp