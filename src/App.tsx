import React,{useRef, useState, useEffect} from 'react';
import logo from './logo.svg';
import { Box, Container, Table, Paper } from '@mantine/core';
import { Button, SegmentedControl } from '@mantine/core';
import { Oturum,useGetPostsQuery, useListBolumlerQuery } from './app/services/users'
import axios, {isCancel, AxiosError} from 'axios';
import { useFetch } from './useFetch'
import { useAppSelector, useAppDispatch } from './app/hooks'
import { BolumBarSecimCubugu } from './components/BolumSecimCubugu';
import { Kutu } from './components/Kutu';

import moment from 'moment-timezone';
import 'moment/locale/tr';
import { selectBbar,bolumuEtkinlestir, bolumleriAl } from './features/counter/bbarSlice'
import { selectBolumOturumEslesmeleri, bolumOturumEslesmeleriniCek } from './features/counter/bolumOturumEslesmeleri'





console.log(moment.locale()); // en
moment.locale("tr");

type SegmentedControlItem = { label : string, value: string }
type StateTip<T> = React.Dispatch<React.SetStateAction<T>>
type SegmentedControl = { label : string, value: string, renk:string } | null

interface TumBolumler {
  data: SegmentedControl[] | undefined;
}




export type Salon = {
	id : string,
	salonAdi : string,
	kapasite : number
} | null
export type Oturumm = {
	id : string;
   	gun: number ;
   	ay : number;
   	yil : number;
   	saat : number;
   	dakika : number;
} | null

export type Tablo = {
	salonlar : Salon[] | null;
	oturumlar : Oturumm[] | null;
}
const elements = [
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];

function App() {
  const ref = useRef<null | HTMLTableElement>(null)

  //const { data1, error } = useFetch<Tablo>('http://localhost:3000/users')
  const {data:data, isLoading:isLoading1} = useGetPostsQuery() 
  //console.log(data, error)
  //console.log(useListBolumlerQuery())
//const { data:posts, isLoading } = useListBolumlerQuery()
//console.log(posts)
//const postalar = posts as SegmentedControl[];
//const abcd = {data : postalar}
//
//	const data1 = useAppSelector(selectBbar)
//const data2 = useAppSelector(selectBolumOturumEslesmeleri)

   	const dispatch = useAppDispatch()


	 useEffect(() => {
	 console.log("ss");
    dispatch(bolumleriAl())
    dispatch(bolumOturumEslesmeleriniCek())
  }, [])
  //console.log(data2)
const demoProps = {
    bg: 'var(--mantine-color-blue-light)',
    mt: 'md',
  };


  return ( 
  <Container size="xl" {...demoProps}>
  <Paper>
  <BolumBarSecimCubugu />
  <Table withTableBorder withColumnBorders verticalSpacing="10px" borderColor="#BBBBBB" style={{ width: 'auto', borderSize: '10px' }} ref={ref}>
      <Table.Thead>
      	<Table.Tr>
	<Table.Th></Table.Th>
	{data?.salonlar?.map(salon => (
	  <Table.Th>{salon?.salonAdi}</Table.Th>))
	}
	</Table.Tr>

      </Table.Thead>
      <Table.Tbody>
	{data?.oturumlar?.map(oturum => (

      	<Table.Tr>
		<Table.Td>{moment.tz([oturum?.yil, oturum?.ay, oturum?.gun, oturum?.saat, oturum?.dakika], "Europe/Istanbul").format("DD-MM-YYYY dddd HH:mm")}</Table.Td>
		{data?.salonlar?.map(salon => (
		<Kutu oturumid={oturum.id} salonid={salon.id} />))}

	</Table.Tr>	

	  ))
	}
      </Table.Tbody>
    </Table>
</Paper>
</Container>
  );
}
export default App;
