import { Jumbotron, Container } from 'react-bootstrap'
import styles from '../styles/Jumbotron.module.css'

function JumbotronComp () {
  return (
    <>
      <Jumbotron fluid className={styles.jumbotronimage}>
        <h1 style={{fontFamily: "Lobster"}} className={styles.container}>Foody</h1>
      </Jumbotron>
    </>
  )
}

export default JumbotronComp