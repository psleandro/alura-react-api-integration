import { Box, Button, TextField, Typography } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";

const RestaurantForm = () => {

  const [name, setName] = useState('');

  const params = useParams();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (params.id) {
        await axios.put(`http://localhost:8000/api/v2/restaurantes/${params.id}/`, { nome: name })
        alert('Restaurante atualizado com sucesso!');
        return;
      }

      await axios.post('http://localhost:8000/api/v2/restaurantes/', { nome: name });
      alert('Restaurante cadastrado com sucesso!');
    } catch (e) { }
  }

  const getCurrentRestaurant = async (restaurantId: string) => {
    try {
      const { data } = await axios.get<IRestaurante>(
        `http://localhost:8000/api/v2/restaurantes/${restaurantId}/`
      );
      setName(data.nome);
    } catch (e) { }
  }

  useEffect(() => {
    if (params.id) getCurrentRestaurant(params.id);
  }, [params])

  return (
    <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", gap: 4, mt: 4 }}>
      <Typography component="h1" variant="h6">Formulário de Restaurantes</Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
      >
        <TextField
          label="Nome do restaurante"
          fullWidth
          required
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          type="submit"
          sx={{ marginTop: 2 }}
        >
          Criar
        </Button>
      </Box>
    </Box>
  )
}

export default RestaurantForm;