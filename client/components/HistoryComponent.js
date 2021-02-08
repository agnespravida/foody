import { Card } from 'react-bootstrap'
import styles from '../styles/History.module.css'
function HistoryComponent (props) {

  function convertedRupiah () {
    let rupiah = ''
    const angkarev = (props.history.price * props.history.quantity).toString().split('').reverse().join('')
    for (let i = 0; i < angkarev.length; i++) if (i % 3 === 0) rupiah += angkarev.substr(i, 3) + '.'
    return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('')
  }
  return (
    <>
    <Card className={styles.card}>
      <img src={props.history.imageUrl} alt={props.history.name} width="85" height="85" style={{marginRight: '20px'}}/>
      <div style={{marginRight: '20px', textAlign: 'center'}}>
        <p style={{fontSize: '1rem', marginBottom: '5px'}}><b>{props.history.name}</b></p>
        <p style={{fontSize: '1rem', marginBottom: '5px'}}>Amount: {props.history.quantity}</p>
        <p style={{fontSize: '1rem', marginBottom: '5px'}}><b>Total price: {convertedRupiah()}</b></p>
        <p>Checkout Date: {new Date(parseInt(props.history.createdAt)).toUTCString()}</p>
      </div>
      
    </Card>
    </>
  )
}

export default HistoryComponent