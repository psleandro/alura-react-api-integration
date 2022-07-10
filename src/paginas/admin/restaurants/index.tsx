import { Button, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";

const RestaurantsAdmin = () => {
  const [restaurants, setRestaurants] = useState<IRestaurante[]>([]);

  const getRestaurants = async () => {
    try {
      const { data } = await axios.get<IRestaurante[]>('http://localhost:8000/api/v2/restaurantes/');
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
                <Button color="error">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default RestaurantsAdmin;