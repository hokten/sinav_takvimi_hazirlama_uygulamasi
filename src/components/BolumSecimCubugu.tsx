import React,{useRef, useState, useEffect} from 'react';
import logo from './logo.svg';
import { Box, Container, Table, Paper } from '@mantine/core';
import { Button, SegmentedControl } from '@mantine/core';
import { Oturum,useGetPostsQuery } from '../app/services/users'
import axios, {isCancel, AxiosError} from 'axios';
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { selectBbar,bolumuEtkinlestir, bolumleriAl  } from '../features/counter/bbarSlice'
import { useFetch } from 'usehooks-ts'
import { RootState, store } from '../app/store';
import { createSelector } from 'reselect'

import moment from 'moment-timezone';
import 'moment/locale/tr';
import {
  useListBolumlerQuery
} from '../app/services/users'




//    	onChange={(value: string) => {setBolum(value); setRenk(data.filter((val) => val!.value==value)[0].renk); console.log(value)}}
//      	data={data.map((obj) => ({label: obj!.label, value: obj!.value}))} />)



type SegmentedControl = { label: string, value: string, renk: string } | null


interface TumBolumler {
  data: SegmentedControl[] | undefined;
}

export const BolumBarSecimCubugu = () => {
  const abc = createSelector([(state: RootState) => state.bbar], (val) => val.bolumler.filter((s) => s.value==val.etkin)[0])
  const def = abc(store.getState());
 //console.log(def.renk)

 	const data = useAppSelector(selectBbar)
   	const dispatch = useAppDispatch()
	console.log(data)
	//const renk = data.bolumler.filter((val) => val!.value==data.etkin)[0].renk; 
	 useEffect(() => {
	 console.log("ss");
    dispatch(bolumleriAl())
  }, [])
  let renk;
  if(def  !== undefined) { renk = def.renk } else { renk = "red" }
      return (
    <SegmentedControl
    value={data.etkin}
    	color={renk}
    	onChange={(value: string) => {dispatch(bolumuEtkinlestir(value)); console.log(data); console.log(def)}}
      	data={data.bolumler.map((obj) => ({label: obj!.label, value: obj!.value}))}  />)
	}

