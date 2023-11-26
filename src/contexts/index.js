import {useState, createContext, useEffect} from 'react'
import getApi from '../services/api'

export const AppContext = createContext({})

export default function AppProvider ({children}) {

  const [searchApi, setSearchApi] = useState('heroku')
  const [statusConnection, setStatusConnection] = useState(false)
  const [client, setClient] = useState('null')
  const [regions, setRegions] = useState([])
  const [regionSelected, setRegionSelected] = useState('')

  const [stores, setStores] = useState([])
	const [persons, setPersons] = useState([])
  const [professions, setProfessions] = useState([])

  const [categorySelected, setCategorySelected] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [subcategoryName, setSubcategoryName] = useState('')
  const [user, setUser] = useState('')

  const [typeAccount, setTypeAccount] = useState('')
  const [] = useState()

  useEffect(() => {
    HandleStores()
    HandlePersons()
    HandleRegions()
    HandleProfessions()
  },[searchApi])


  async function HandleStores() {
		try {
			const response = await getApi(searchApi).get('storesAdmin')
			setStores(response.data)
			setStatusConnection(true)

		} catch (error) {

		}
	}

	async function HandlePersons() {
    try {
      const response = await getApi(searchApi).get('personsAdmin')
      setPersons(response.data)

    } catch (error) {
      if (error.message === 'Network Error') {
        setStatusConnection(false)
      }
    }
  }

	async function HandleProfessions() {
    try {
      const response = await getApi(searchApi).get('professions')
      setProfessions(response.data)

    } catch (error) {
      if (error.message === 'Network Error') {
        setStatusConnection(false)
      }
    }
  }

  async function HandleRegions() {
    await getApi(searchApi).get('regions').then(response => setRegions(response.data))
      .catch((error) => {
        if (error.message === 'Network Error') {
          setStatusConnection(false)
        }
      })
  }


  return (
    <AppContext.Provider value={{
      getApi, searchApi, setSearchApi,
      setStatusConnection, statusConnection,
      setClient, client,
      user, setUser,
      categorySelected, setCategorySelected,categoryName, setCategoryName,subcategoryName, setSubcategoryName,
      HandleStores, stores, HandlePersons, persons,
      HandleRegions,regions, setRegions, setRegionSelected, regionSelected,
      typeAccount, setTypeAccount,
      HandleProfessions, professions
    }}>
      {children}
    </AppContext.Provider>
  )
}