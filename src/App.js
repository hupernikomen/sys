import Create from './areas/Create';
import ListUsers from './areas/ListUsers';
import ListRegions from './areas/ListRegions';
import DashUser from './areas/DashUser';
import ListCategories from './ListCategories';
import AppProvider from './contexts';

export default function App() {

  return (
    <AppProvider>
      <div style={{ display: 'grid', gridTemplateColumns: '250px repeat(4, 1fr)', gridTemplateRows: 'repeat(2, 1fr)', gap: 6, height: '100vh' }}>

        <Create />
        <ListCategories indice={4} />
        <ListUsers indice={3} />
        <ListRegions indice={2} />
        <DashUser indice={5} />

      </div>
    </AppProvider>

  );
}
