import { Button, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import IPrato from "../../../interfaces/IPrato";
import { api } from "../../../services";

const PlatesAdmin = () => {
  const [plates, setPlates] = useState<IPrato[]>([]);

  const handleDeleteRestaurant = async (plateId: number) => {
    try {
      await api.delete(`pratos/${plateId}/`);
      setPlates(prevPlates => prevPlates.filter(plate => plate.id !== plateId))
    } catch (e) { }
  }

  const getPlates = async () => {
    try {
      const { data } = await api.get<IPrato[]>('pratos/');
      setPlates(data);
    } catch (e) { }
  }

  useEffect(() => {
    getPlates();
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Imagem</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell>Tag</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {plates?.map(plate => (
            <TableRow key={plate.id}>
              <TableCell>{plate.id}</TableCell>
              <TableCell>
                <Link href={plate.imagem} target="_blank">
                  <img loading="lazy" height={60} src={plate.imagem} alt={`plate-${plate.nome}`} />
                </Link>
              </TableCell>
              <TableCell>{plate.nome}</TableCell>
              <TableCell sx={{ maxWidth: 120 }}>{plate.descricao}</TableCell>
              <TableCell>{plate.tag}</TableCell>
              <TableCell>
                <Link
                  underline="hover"
                  component={RouterLink}
                  to={`/admin/plates/${plate.id}`}
                >
                  Editar
                </Link>
                <Button
                  color="error"
                  onClick={() => handleDeleteRestaurant(plate.id)}
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

export default PlatesAdmin;