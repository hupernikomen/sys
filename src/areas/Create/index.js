import { useState, useContext } from 'react';
import { AppContext } from '../../contexts';

export default function Create() {

   const {
      setUser,
      user,
      getApi,
      HandleProfessions,
      setCategoryName,
      setSubcategoryName,
      subcategoryName,
      setCategorySelected,
      categorySelected,
      categoryName,
      setSearchApi,
      searchApi,
      HandleStores,
      HandlePersons,
      statusConnection,
      HandleRegions,
      setRegionSelected,
      regionSelected,
      typeAccount,
      setTypeAccount
   } = useContext(AppContext)

   const [userAdmin, setUserAdmin] = useState(null)
   const [passwordAdmin, setPasswordAdmin] = useState(null)
   const [region, setRegion] = useState('')
   const [professionName, setProfessionName] = useState('')

   const response = localStorage.getItem('@authGuia')
   const credentials = JSON.parse(response)

   const passwordDefault = "123"


   async function SignIn() {

      await getApi(searchApi).post('login', { user: userAdmin, password: passwordAdmin })
         .then(async response => {

            const { token } = response.data
            const data = { ...response.data }
            localStorage.setItem('@authGuia', JSON.stringify(data))

            if (token) {
               window.location.reload()
            }

            getApi(searchApi).defaults.headers.common['Authorization'] = `Bearer ${token}`

         })
         .catch(({ response }) => {
            alert(response.data.error);
         })

   }



   async function RegisterUser() {
      const latlng = {
         latitude: -5.1036423,
         longitude: -42.7516067,
      }

      try {
         const response = await getApi(searchApi).post(`user?regionID=${regionSelected}`, { user, password: passwordDefault }, { headers })
         await getApi(searchApi).post(`${typeAccount}`, { userID: response.data?.id }, { headers })
         await getApi(searchApi).post(`map?userID=${response.data?.id}`, { latlng }, { headers })
      } catch (error) {
         console.log(error.response)
      } finally {
         setUser('')
         setRegionSelected('')
         setTypeAccount('')
         HandleStores()
         HandlePersons()
      }
   }


   const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${credentials?.token}`
   }

   async function CriaCategoria() {
      try {
         await getApi(searchApi).post('category', { name: categoryName }, { headers })
         setCategoryName('')
      } catch (error) {
         console.log(error.response)
      }
   }


   async function CreateRegion() {
      try {
         await getApi(searchApi).post('region', { name: region }, { headers })
         HandleRegions()
         setRegion("")
      } catch (err) {
         console.log(err)
      }
   }


   async function CriarSubcategoria() {
      if (subcategoryName === '') return
      try {
         await getApi(searchApi).post(`subcategory?categoryID=${categorySelected}`, { name: subcategoryName }, { headers })
         setCategorySelected('')
         setSubcategoryName('')
      } catch (error) {
         console.log(error.response)
      }
   }


   async function CriarProfissao() {
      if (professionName === '') return
      try {
         await getApi(searchApi).post(`profession`, { name: professionName }, { headers })
         setProfessionName('')
         HandleProfessions()
      } catch (error) {
         console.log(error.response)
      }
   }


   return (
      <div style={{
         marginBottom: 2,
         backgroundColor: '#282c34',
         padding: 6
      }}>
         <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: 40, marginBottom: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #777', padding: 6, borderRadius: 6 }}>
               <div style={{ width: 12, height: 12, marginRight: 6, borderRadius: 10, backgroundColor: statusConnection ? "green" : "red" }} />
               <label style={{ color: '#aaa', fontSize: 12 }}>{statusConnection ? "Online" : "Offline"}</label>
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
               <input checked={searchApi === 'heroku'} type="radio" value={'heroku'} onChange={(e) => setSearchApi(e.target.value)} />
               <label style={{ color: '#aaa', fontSize: 12 }}>Heroku</label>
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
               <input checked={searchApi === 'local'} type="radio" value={'local'} onChange={(e) => setSearchApi('local')} />
               <label style={{ color: '#aaa', fontSize: 12 }}>Local</label>
            </div>
         </div>


         {!credentials?.token ? <div style={{ padding: '6px 0px' }}>
            <input placeholder="email" style={{ border: 'none', padding: '0px 12px', width: '100%', height: 35, backgroundColor: '#21252b', color: '#aaa' }} onChange={(e) => setUserAdmin(e.target.value)} />
            <div style={{ display: 'flex' }}>
               <input placeholder="senha" style={{ border: 'none', padding: '0px 12px', width: '100%', height: 35, backgroundColor: '#21252b', color: '#aaa' }} onChange={(e) => setPasswordAdmin(e.target.value)} />
               <button style={{ backgroundColor: '#282c34', color: '#aaa', border: 'none' }} onClick={() => SignIn()}>Login</button>
            </div>
         </div> : null}


         <div style={{ display: 'flex', alignItems: 'center', marginBottom: 2, }}>
            <input
               value={region}
               onChange={(e) => setRegion(e.target.value)}
               placeholder='Região'
               style={{ border: 'none', padding: '0px 12px', height: 35, width: '100%', backgroundColor: '#21252b', color: '#aaa' }}
            />

            <button
               onClick={() => CreateRegion()}
               disabled={!region} style={{ height: 35, width: 40, fontSize: 22, border: 'none', backgroundColor: '#2E7D32', color: '#aaa', opacity: !region ? '.3' : '1' }}>
               +
            </button>
         </div>

         <div style={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
            <input
               value={user}
               onChange={(e) => setUser(e.target.value)}
               placeholder='Usuario'
               style={{ border: 'none', padding: '0px 12px', height: 35, width: '100%', backgroundColor: '#21252b', color: '#aaa' }}
            />

            <button
               onClick={() => RegisterUser()}
               disabled={!user || !regionSelected || !typeAccount} style={{ height: 35, width: 40, fontSize: 22, border: 'none', backgroundColor: '#2E7D32', color: '#aaa', opacity: !user || !regionSelected || !typeAccount ? '.3' : '1' }}>
               +
            </button>
         </div>

         <div style={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
            <input value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder='Categoria' style={{ border: 'none', height: 35, padding: '0px 12px', width: '100%', backgroundColor: '#21252b', color: '#aaa' }} />
            <button onClick={() => CriaCategoria()} disabled={!categoryName} style={{ height: 35, width: 40, fontSize: 22, border: 'none', backgroundColor: '#2E7D32', color: '#aaa', opacity: !categoryName ? '.3' : '1' }}>+</button>
         </div>

         <div style={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
            <input value={subcategoryName} onChange={(e) => setSubcategoryName(e.target.value)} placeholder='Subategoria' style={{ border: 'none', height: 35, padding: '0px 12px', width: '100%', backgroundColor: '#21252b', color: '#aaa' }} />
            <button onClick={() => CriarSubcategoria()} disabled={!categorySelected || !subcategoryName} style={{ height: 35, width: 40, fontSize: 22, border: 'none', backgroundColor: '#2E7D32', color: '#aaa', opacity: !categorySelected || !subcategoryName ? '.3' : '1' }}>+</button>
         </div>

         <div style={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
            <input value={professionName} onChange={(e) => setProfessionName(e.target.value)} placeholder='Profissão' style={{ border: 'none', height: 35, padding: '0px 12px', width: '100%', backgroundColor: '#21252b', color: '#aaa' }} />
            <button onClick={() => CriarProfissao()} disabled={!professionName} style={{ height: 35, width: 40, fontSize: 22, border: 'none', backgroundColor: '#2E7D32', color: '#aaa', opacity: !professionName ? '.3' : '1' }}>+</button>
         </div>

      </div>
   )
}