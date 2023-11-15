import { useEffect, useState } from 'react';
import moment from 'moment';
import getApi from './services/api'
import Create from './areas/Create';
import ListUsers from './areas/ListUsers';
import ListRegions from './areas/ListRegions';
import DashUser from './areas/DashUser';
import ListCategories from './ListCategories';

export default function App() {

  const [typeAccount, setTypeAccount] = useState('')
  const [statusConnection, setStatusConnection] = useState(false)
  const [searchApi, setSearchApi] = useState('heroku')
  const [client, setClient] = useState('null')
  const [categorySelected, setCategorySelected] = useState('')
  const [regions, setRegions] = useState([])
  const [region, setRegion] = useState('')
  const [user, setUser] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [stores, setStores] = useState([])
  const [persons, setPersons] = useState([])
  const [regionSelected, setRegionSelected] = useState('')

  const [datePayment, setDatePayment] = useState(null)
  const [valuePayment, setValuePayment] = useState(0)
  const [registerPayment, setRegisterPayment] = useState(null)

  const [subcategoryName, setSubcategoryName] = useState('')

  const formattedDatePayment = moment(registerPayment?.datePayment, 'DD/MM/YYYY');
  const diffDias = formattedDatePayment.diff(moment(), 'days');
  const isOnline = moment().isBefore(formattedDatePayment);

  useEffect(() => {
    HandlePayment()
    
  }, [region, user, categoryName, client, searchApi])
  
  useEffect(() => {
    BuscarApi()

  },[searchApi])


  async function BuscarApi() {
    setStatusConnection(false)

    await Promise.all([HandleStores(), HandlePersons(), HandleRegions()])
      .then(() => {
        setStatusConnection(true)
        console.log("ok");

      })
      .catch((error) => {
        if (error.message === 'Network Error') {
          setStatusConnection(false)
        }
      })
  }
  async function DeleteRegion() {

    let response = localStorage.getItem('@authGuia')
    let credentials = JSON.parse(response)

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${credentials.token}`
    }

    await getApi(searchApi).delete(`region?regionID=${regionSelected}`, { headers })
      .then(() => BuscarApi())
      .catch((error) => console.log(error.response))
      .finally(() => setRegionSelected(''))
  }
  async function HandleStores() {
    try {
      const response = await getApi(searchApi).get('storesAdmin')
      setStores(response.data)

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
  async function HandleRegions() {
    await getApi(searchApi).get('regions').then(response => setRegions(response.data))
      .catch((error) => {
        if (error.message === 'Network Error') {
          setStatusConnection(false)
        }
      })
  }
  
  async function Payment() {

    let authGuia = localStorage.getItem('@authGuia')
    let credentials = await JSON.parse(authGuia)

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${credentials.token}`
    }

    // const registerPayment = await getApi(searchApi).get(`payment?userID=${client?.userID}`)
    if (!!registerPayment) {
      await getApi(searchApi).put(`payment?paymentID=${registerPayment?.id}`, {
        value: valuePayment,
        datePayment
      }, { headers })
        .then(() => console.log("atualizado"))
        .finally(() => setClient(client))

    } else {

      await getApi(searchApi).post(`payment?userID=${client?.userID}`, {
        value: valuePayment,
        datePayment
      }, { headers })
        .then((response) => console.log(response))
        .catch((error) => console.log(error))
    }
  }
  async function HandlePayment() {
    await getApi(searchApi).get(`payment?userID=${client?.userID}`)
      .then((response) => setRegisterPayment(response.data))
      .catch((error) => {
        if (error.message === 'Network Error') {
          setStatusConnection(false)
        }
      })
  }


  return (
    <div style={{ display: 'grid', gridTemplateColumns: '250px repeat(4, 1fr)', gridTemplateRows: 'repeat(2, 1fr)', gap: 6, height: '100vh' }}>

      <Create
        getApi={getApi}
        setSearchApi={setSearchApi}
        statusConnection={statusConnection}
        searchApi={searchApi}
        setRegion={setRegion}
        region={region}
        setUser={setUser}
        user={user}
        setTypeAccount={setTypeAccount}
        typeAccount={typeAccount}
        setRegionSelected={setRegionSelected}
        regionSelected={regionSelected}
        setCategoryName={setCategoryName}
        categoryName={categoryName}
        categorySelected={categorySelected}
        setSubcategoryName={setSubcategoryName}
        subcategoryName={subcategoryName}
        setCategorySelected={setCategorySelected}
        HandleRegions={HandleRegions}
        HandleStores={HandleStores}
        HandlePersons={HandlePersons}

      />

      <ListCategories
        getApi={getApi}
        searchApi={searchApi}
        indice={4}
        setCategorySelected={setCategorySelected} 
        categorySelected={categorySelected}
        categoryName={categoryName}
        />

      <ListUsers
        indice={3}
        typeAccount={typeAccount}
        setTypeAccount={setTypeAccount}
        stores={stores}
        persons={persons}
        setClient={setClient}
        client={client}
      />

      <ListRegions
        indice={2}
        regions={regions}
        regionSelected={regionSelected}
        setRegionSelected={setRegionSelected}
        DeleteRegion={DeleteRegion}
      />

      <DashUser
        indice={5}
        client={client}
        setClient={setClient}
        isOnline={isOnline}
        registerPayment={registerPayment}
        diffDias={diffDias}
        Payment={Payment}
        setValuePayment={setValuePayment}
        valuePayment={valuePayment}
        setDatePayment={setDatePayment}
        datePayment={datePayment}
      />



      {/* <div style={{
        gridRow: '1 / span 2',
        gridColumn: '5 / span 1',
      }}>
        <input onChange={(e) => setUserAdmin(e.target.value)} />
        <input onChange={(e) => setPasswordAdmin(e.target.value)} />
        <button onClick={() => SignIn()}>Login</button>

      </div>

      <div style={{
        gridRow: '2 / span 1',
        gridColumn: '2 / span 3',
      }}></div> */}
    </div>
  );
}
