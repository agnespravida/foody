import HistoryComponent from '../components/HistoryComponent'
import NavbarHome from '../components/NavbarHome'
import { useQuery } from '@apollo/client'
import { GET_HISTORY } from '../cache/queries'

function History () {
  const { data, error, loading } = useQuery(GET_HISTORY)
  if (error) {
    console.log(error)
  }
  
  return (
    <>
    <NavbarHome />
    <h2>History</h2>
    {
      data && data["History"].map(history => <HistoryComponent key={history.id} history={history}/>)
    }
    </>
  )
}

export default History