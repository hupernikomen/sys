import Create from './areas/Create';
import ListUsers from './areas/ListUsers';
import ListRegions from './areas/ListRegions';
import DashUser from './areas/DashUser';
import ListCategories from './areas/ListCategories';
import AppProvider from './contexts';
import { useState, useEffect } from 'react';

export default function App() {
 const [isDesktop, setIsDesktop] = useState(false);

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
        <div style={{
          display: 'grid',
          gridTemplateColumns: isDesktop ? 'repeat(auto-fit, minmax(200px, 1fr))' : '1fr',
        }}>
          <div style={{
            borderRadius: '4px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}>

            <Create />
            <ListRegions indice={2} />
            <ListUsers indice={3} />
            <ListCategories indice={4} />
            <DashUser indice={5} />

          </div>
        </div>
      </div>
    </AppProvider>

 );
}