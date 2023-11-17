import {  useContext } from "react"
import { AppContext } from "../../contexts"

export default function ListRegions({ indice }) {

  const { searchApi, getApi, regions, setRegionSelected, regionSelected, HandleRegions } = useContext(AppContext)

  async function DeleteRegion() {

    let response = localStorage.getItem('@authGuia')
    let credentials = JSON.parse(response)


    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${credentials.token}`
    }

    await getApi(searchApi).delete(`region?regionID=${regionSelected}`, { headers })
      .then(() => { HandleRegions() })
      .catch((error) => console.log(error))
      .finally(() => setRegionSelected(''))
  }

  return (
    <div style={{
      gridRow: '1 / span 2',
      gridColumn: `${indice} / span 1`,
      backgroundColor: '#282c34',
      padding: 6,
    }}>

      <div style={{ height: 40, marginBottom: 2, display: 'flex', alignItems: 'center' }}>
        {regionSelected ? <button style={{ border: 'none', height: 25, borderRadius: 6, background: '#C62828', color: '#aaa' }} onClick={() => DeleteRegion()}>Excluir</button> :
          <div style={{ color: '#aaa', fontSize: 14, textAlign: 'center', width: '100%' }}>Regiões</div>}
      </div>

      {regions.filter(region => region.name !== "Teresina").map((item, i) => {
        
        return (

          <div key={i} onClick={() => {
            if (regionSelected) {
              setRegionSelected('')
            } else {
              setRegionSelected(item.id)
            }
          }} style={{ flexDirection: 'column', marginBottom: 2, backgroundColor: regionSelected === item.id ? '#2E7D32' : '#21252b', height: 35, display: 'flex', alignItems: 'flex-start', justifyContent: "center", paddingLeft: 12 }}>
            <div style={{ color: '#aaa', fontSize: 13, }}>{item.name}</div>
          </div>
        )
      })}
    </div>
  )
}