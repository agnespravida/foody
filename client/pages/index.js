import Head from 'next/head'
import styles from '../styles/Home.module.css'
import JumbotronComp from '../components/jumbotronComp'
import { useQuery } from '@apollo/client'
import { GET_PRODUCTS } from '../cache/queries'

export default function Home() {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  if (data) {
    console.log(data)
  }
  if (error) {
    console.log(error)
  }
  return (
    <div>
      <Head>
        <title>foody</title>
      </Head>

      <JumbotronComp />
      <main className={styles.main}>
        {
          loading ? <h1>Loading...</h1> : <div>{JSON.stringify(data)}</div>
        }
        {/* <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>
        </div> */}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
