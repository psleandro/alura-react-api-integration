import { Button, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";
import { api } from "../../../services";

const RestaurantsAdmin = () => {
  const [restaurants, setRestaurants] = useState<IRestaurante[]>([]);

  const handleDeleteRestaurant = async (restaurantId: number) => {
    try {
      await api.delete(`restaurantes/${restaurantId}/`);
      setRestaurants(prevRest => prevRest.filter(rest => rest.id !== restaurantId))
    } catch (e) { }
  }

  const getRestaurants = async () => {
    try {
      const { data } = await api.get<IRestaurante[]>('restaurantes/');
      setRestaurants(data);
    } catch (e) { }
  }

  useEffect(() => {
    getRestaurants();
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurants?.map(restaurant => (
            <TableRow key={restaurant.id}>
              <TableCell>{restaurant.id}</TableCell>
              <TableCell>{restaurant.nome}</TableCell>
              <TableCell>
                <Link
                  underline="hover"
                  component={RouterLink}
                  to={`/admin/restaurants/${restaurant.id}`}
                >
                  Editar
                </Link>
                <Button
                  color="error"
                  onClick={() => handleDeleteRestaurant(restaurant.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default RestaurantsAdmin;