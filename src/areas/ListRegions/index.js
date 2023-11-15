export default function ListRegions({ indice, regions, regionSelected, setRegionSelected, DeleteRegion }) {
  return (
     <div style={{
       gridRow: '1 / span 2',
       gridColumn: `${indice} / span 1`,
       backgroundColor: '#282c34',
       padding: 6,
     }}>

       <div style={{ height: 40, marginBottom:6, display:'flex', alignItems:'center' }}>
         {regionSelected ? <button style={{ border: 'none', height: 25, borderRadius: 6, background:'#C62828', color:'#aaa' }} onClick={DeleteRegion}>Excluir</button> : 
         <div style={{ color: '#aaa', fontSize: 14, textAlign:'center', width:'100%' }}>Regiões</div>}
       </div>

       {/* <input placeholder='Busca' style={{ border: 'none', padding: 12, width: '100%', backgroundColor: '#21252b', marginBottom: 6, color: '#aaa' }} /> */}
       {regions.filter(region => region.name !== "Teresina").map((item, i) => (
         <div key={i} onClick={() => {
           if (regionSelected) {
             setRegionSelected('')
           } else {
             setRegionSelected(item.id)
           }
         }} style={{ flexDirection: 'column', marginBottom: 4, backgroundColor: regionSelected === item.id ? '#2E7D32' : '#21252b', height: 40, display: 'flex', alignItems: 'flex-start', justifyContent: "center", paddingLeft: 12 }}>
           <div style={{ color: '#aaa', fontSize: 13, }}>{item.name}</div>
         </div>
       ))}
     </div>
  )
 }