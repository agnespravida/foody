import HistoryComponent from '../components/HistoryComponent'
import NavbarHome from '../components/NavbarHome'
import { useQuery } from '@apollo/client'
import { GET_HISTORY } from '../cache/queries'
import Head from 'next/head'
import styles from '../styles/History.module.css'

function History () {
  const { data, error, loading } = useQuery(GET_HISTORY)
  if (error) {
    console.log(error)
  }

  return (
    <>
      <Head>
        <title>foody</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet"></link>
      </Head>
    <NavbarHome />
    <main className={styles.main}>
      <h1 style={{fontFamily: "Lobster", fontSize: '3rem', marginBottom: '30px', textAlign: 'center'}}>Your Order History</h1>
    {
      data && data["History"].map(history => <HistoryComponent key={history.id} history={history}/>)
    }
    </main>
    </>
  )
}

export default History