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
          gridTemplateColumns: isDesktop ? 'repeat(auto-fit, minmax(300px, 1fr))' : '1fr',
          gap: 10
        }}>
          <Create />
          <ListRegions />
          <ListUsers />
          <ListCategories />
          <ListProfessions />
          <DashUser />

        </div>
      </div>
    </AppProvider>

  );
}