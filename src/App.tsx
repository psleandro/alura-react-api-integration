import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import RestaurantsAdmin from './paginas/admin/restaurants';
import RestaurantForm from './paginas/admin/restaurants/RestaurantForm';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin/restaurants" element={<RestaurantsAdmin />} />
      <Route path="/admin/restaurants/new" element={<RestaurantForm />} />
      <Route path="/admin/restaurants/:id" element={<RestaurantForm />} />
    </Routes>
  );
}

export default App;
