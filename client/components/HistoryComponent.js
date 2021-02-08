function HistoryComponent (props) {
  return (
    <>
      <div>Name: {props.history.name}</div>
      <div>Qty: {props.history.quantity}</div>
      <div>Price: {props.history.price}</div>
      <div>Total Price: {props.history.price * props.history.quantity}</div>
      <div>Date: {new Date(parseInt(props.history.createdAt)).toUTCString()}</div>
    </>
  )
}

export default HistoryComponent