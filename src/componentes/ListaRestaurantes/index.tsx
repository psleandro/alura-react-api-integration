import axios from 'axios';
import { useEffect, useState } from 'react';
import { IPaginacao } from '../../interfaces/IPaginacao';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [nextPage, setNextPage] = useState('');

  const getRestaurantes = async (url?: string) => {
    try {
      const apiUrl = url ? url : 'http://localhost:8000/api/v1/restaurantes/';
      const { data } = await axios.get<IPaginacao<IRestaurante>>(apiUrl);
      setRestaurantes(prevRest => [...prevRest, ...data.results]);
      setNextPage(data.next);
    } catch (e) { }
  }

  useEffect(() => {
    getRestaurantes();
  }, [])

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {nextPage && <button onClick={() => getRestaurantes(nextPage)}>Ver Mais</button>}
  </section>)
}

export default ListaRestaurantes