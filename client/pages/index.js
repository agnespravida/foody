import Head from 'next/head'
import styles from '../styles/Home.module.css'
import JumbotronComp from '../components/jumbotronComp'
import NavbarHome from '../components/NavbarHome'
import ProductCard from '../components/ProductCard'
import { useQuery } from '@apollo/client'
import { GET_PRODUCTS } from '../cache/queries'

export default function Home() {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  if (error) {
    console.log(error)
  }
  return (
    <div>
      <Head>
        <title>foody</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet"></link>
      </Head>
      <NavbarHome />
      <JumbotronComp />
      <main className={styles.main}>
        {
          loading && <h1>Loading...</h1>
        }
        {
          error && <h1>Error...</h1>
        }
        <div className={styles.grid}>
        {
          data && data["Products"].map(element => <ProductCard product={element} key={element.id}/>)
        }
        </div>
      </main>

      <footer className={styles.footer}>
        <div style={{textAlign: 'center'}}>
          Created by Agnes Pravida Irlitashanty <br/>
          Data Source from Spoonacular
        </div>
      </footer>
    </div>
  )
}
