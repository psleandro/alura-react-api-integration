import { Button, TextField } from "@mui/material"
import axios from "axios";
import { useState } from "react";

const RestaurantForm = () => {

  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/v2/restaurantes/', { nome: name });
      alert('Restaurante cadastrado com sucesso!');
    } catch (e) { }
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Nome do restaurante"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <Button variant="contained" type="submit">Criar</Button>
    </form>
  )
}

export default RestaurantForm;