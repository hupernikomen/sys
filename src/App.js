import Create from './areas/Create';
import ListUsers from './areas/ListUsers';
import ListRegions from './areas/ListRegions';
import DashUser from './areas/DashUser';
import ListCategories from './areas/ListCategories';
import ListProfessions from './areas/ListProfessions';
import AppProvider from './contexts';
import { useState, useEffect } from 'react';

export default function App() {
  const [isDesktop, setIsDesktop] = useState(false);

  const [create, setCreate] = useState(false)
  const [regions, setRegions] = useState(false)
  const [dash, setDash] = useState(false)

  useEffect(() => {
    const updateMedia = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener('resize', updateMedia);
    updateMedia();

    return () => window.removeEventListener('resize', updateMedia);
  }, []);

  return (
    <AppProvider>
      <div style={{
        display: 'block',
      }}>
        <div style={{height:40, background:'#282c34', marginBottom:10, display:'flex', alignItems:'center',gap:6, paddingLeft:12, paddingRight:12}}>

          <div style={{background: create ? '#2E7D32':'#282c34', padding: 8, fontSize:12, color: '#fff'}} onClick={() => setCreate(!create)}>Create</div>
          <div style={{background: regions ? '#2E7D32':'#282c34', padding: 8, fontSize:12, color: '#fff'}} onClick={() => setRegions(!regions)}>Regiões</div>
          <div style={{background: dash ? '#2E7D32':'#282c34', padding: 8, fontSize:12, color: '#fff'}} onClick={() => setDash(!dash)}>Dash</div>

        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isDesktop ? 'repeat(auto-fit, minmax(300px, 1fr))' : '1fr',
          height:'90vh',
          gap: 10
        }}>
          {create && <Create />}
          {regions && <ListRegions />}
          <ListUsers setDash={setDash} dash={dash} />
          <ListCategories />
          <ListProfessions />
          {dash && <DashUser />}

        </div>
      </div>
    </AppProvider>

  );
}