import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";
import ITag from "../../../interfaces/ITag";
import { api } from "../../../services";

const PlateForm = () => {

  const [tags, setTags] = useState<ITag[]>([]);
  const [restaurants, setRestaurants] = useState<IRestaurante[]>([]);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const [restaurant, setRestaurant] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const params = useParams();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (params.id) {
        const formData = new FormData();
        formData.append('nome', name);
        formData.append('descricao', description);
        formData.append('tag', tag);
        formData.append('restaurante', restaurant);
        if (image) formData.append('imagem', image);
        await api.request({
          url: 'pratos/',
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          data: formData,
        });

        setName('');
        setDescription('');
        setTag('');
        setRestaurant('');
        setImage(null);
        alert('Prato cadastrado com sucesso!');
        return;
      }
    } catch (e) {
      console.log("error", e);
    }
  }

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newImage = e.target.files?.length ? e.target.files[0] : null;
    setImage(newImage);
  }

  const getFormValues = async () => {
    try {
      const [{ data: dataTags }, { data: dataRestaurants }] = await Promise.all([
        await api.get<{ tags: ITag[] }>('tags/'),
        await api.get<IRestaurante[]>('restaurantes/'),
      ])
      setTags(dataTags.tags);
      setRestaurants(dataRestaurants);
    } catch (e) { }
  }

  useEffect(() => {
    getFormValues();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", gap: 4, mt: 4 }}>
      <Typography component="h1" variant="h6">Formulário de Pratos</Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 4 }}
      >

        <TextField
          label="Nome do prato"
          fullWidth
          required
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <TextField
          label="Descrição do prato"
          fullWidth
          required
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <FormControl fullWidth>
          <InputLabel id="select-tag">Tag</InputLabel>
          <Select labelId="select-tag" value={tag} onChange={(e) => setTag(e.target.value)}>
            {tags?.map(tag => (
              <MenuItem key={tag.id} value={tag.value}>{tag.value}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="select-restaurant">Restaurante</InputLabel>
          <Select labelId="select-restaurant" value={restaurant} onChange={(e) => setRestaurant(e.target.value)}>
            {restaurants?.map(restaurant => (
              <MenuItem key={restaurant.id} value={restaurant.id}>{restaurant.nome}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <input type="file" onChange={handleChangeImage} />

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

export default PlateForm;