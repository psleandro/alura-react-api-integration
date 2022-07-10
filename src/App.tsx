import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import RestaurantsAdmin from './paginas/admin/restaurants';
import RestaurantForm from './paginas/admin/restaurants/RestaurantForm';
import DefaultLayoutAdmin from './layouts/DefaultLayoutAdmin';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />

      <Route path="/admin" element={<DefaultLayoutAdmin />}>
        <Route path="restaurants" element={<RestaurantsAdmin />} />
        <Route path="restaurants/new" element={<RestaurantForm />} />
        <Route path="restaurants/:id" element={<RestaurantForm />} />
      </Route>
    </Routes>
  );
}

export default App;
